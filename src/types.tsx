interface Skills {
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
  isRemote: boolean;
  skills: Skills[];
}

export interface CurrentUser{
  id: number;
  type: string;
  attributes: Attributes;
}

interface AttributesQuickView {
  first_name: String;
  last_name: String;
  skills: Skills[];
}

export interface SearchResult {
  id: String;
  type: String;
  attributes: AttributesQuickView;
}
