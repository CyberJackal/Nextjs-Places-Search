import React from 'react'
import Link from 'next/link'

import { Place } from '../types'

const PlaceItem = ({ place } : { place : Place } ) => {
  return (
    <li className="placeItem container flex gap-4 mx-auto bg-white shadow p-5 rounded mb-4">

      {place.primaryPhoto?
        <div className="w-[180px] h-[180px] flex aspect-square">
          <img src={place.primaryPhoto} className="w-full object-cover" />
        </div>
        : ''
      }

      <div className="flex flex-col py-4">

        <h3 className="font-bold text-large text-gray-900 mb-2">{ place.name }</h3>

        <p className="mb-2">{place.formatted_address}</p>

        {place.rating ?
          <p className="mb-2">Rating: {place.rating}</p>
          : ''
        }

        <div className='flex gap-5 mt-auto'>

          {place.website?
            <a href={place.website} target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start">Website</a>
            :''
          }
          
          {place.phone?
            <a href={'tel:' + place.phone} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start">Call</a>
            :''
          }

        </div>

      </div>

    </li>
  )
}

export default PlaceItem;