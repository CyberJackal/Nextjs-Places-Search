import Head from 'next/head';
import Layout from '../components/layout';
import SearchForm from '../components/searchForm';
import PlaceItem from '../components/placeItem';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState } from "react";

import { Place, Location } from '../types'

/**
 * Fetch a list of locations beased on a query string
 */
async function getLocations (searchQuery: string) {

  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${process.env.GOOGLE_PLACES_API_KEY}`
  
  const res = await fetch(searchUrl);
  const json = await res.json();  

  return json.results;
}

/**
 * Fetch detailed data for each of the locations
 */
async function getLocationsDetails (locations: Location[] ) {  
  const details = await Promise.all(
    locations.map(async (location: Location) => {
      const placeId = location.place_id
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
      const res = await fetch(url)
      const json = await res.json()

      if( json.result.photos ){
        const photoRef = json.result.photos[0].photo_reference;
        const imageLookupUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${photoRef}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        json.result.primaryPhoto = imageLookupUrl;
      }  

      return json.result
    })
  )

  return details
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {

  //Cache content for 10 minuets
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=600',
  );

  const searchQuery = query.query?String(query.query):null;
  let data;

  if(searchQuery){
    const locations = await getLocations(searchQuery)
    const details = await getLocationsDetails(locations)

    //Format the locations so we only have the data we're using
    data = {
      places: details.map( (item: Location ) => {
        
        return {
            id: item.place_id,
            name: item.name,
            formatted_address: item.formatted_address,
            website: item.website?item.website:null,
            phone: item.international_phone_number?item.international_phone_number:null,
            rating: item.rating?item.rating:null,
            primaryPhoto: item.primaryPhoto?item.primaryPhoto:null,
        }
      }),
    }
  }else{
    data = []
  }

  return {
    props: {
      data,
    }
  }
}

const SearchPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {

  const [places, setPlaces] = useState<Place[]>([]);

  return (
    <Layout>
      <Head>
        <title>Search Place</title>
      </Head>

        <SearchForm />

        <div id="places-list">
          { data.places?.map((place: Place) => (
            <PlaceItem key={place.id} place={place} />
          )) }
        </div>

    </Layout>
  )
}

export default SearchPage;