export interface Skills {
  name: string
  proficiency: number;
}

export interface Meeting {
  id: number;
  type: string;
  attributes: {
    partner_id: number;
    date: string;
    start_time: string;
    end_time: string;
    is_host: string;
    is_accepted: Boolean
  };
}

interface Address {
  street: string,
  city: string,
  state: string,
  zipcode: string
}
interface Attributes {
  first_name: string;
  last_name: string;
  email: string;
  address: Address;
  about: string;
  lat: number;
  lon: number;
  is_remote: boolean;
  skills: Skills[];
}

export interface CurrentUser{
  id: number;
  type: string;
  attributes: Attributes;
}

export interface AttributesQuickView {
  distance: number;
  first_name: string;
  is_remote: boolean;
  last_name: string;
  skills: UserSkill[];
}

export interface SearchResult {
  id: string;
  type: string;
  attributes: AttributesQuickView;
}

export interface NewUserData {
  first_name: string,
  last_name: string,
  email: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  is_remote: boolean,
  about: string,
}

// export interface ServerError {
//   statusCode: number;
// }



export interface UserSkill {
    name: string;
    proficiency: number;
} 