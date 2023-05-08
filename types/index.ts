export interface Place {
    id: string;
    name: string;
    formatted_address: string;
    website: string;
    phone: string;
    rating: string;
    primaryPhoto: string;
}

export interface Location {
    place_id: string; 
    name: string; 
    formatted_address: string; 
    website: string;
    international_phone_number: string;
    rating: string;
    primaryPhoto: string;
}