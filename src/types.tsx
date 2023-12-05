export interface Skills {
  name: string
  proficiency: number;
}

interface Meetings {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_accepted: boolean;
  purpose: string;
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
  meetings: Meetings[];
}

export interface CurrentUser{
  id: number;
  type: string;
  attributes: Attributes;
}

export interface AttributesQuickView {
  first_name: string;
  is_remote: boolean;
  last_name: string;
  skills: Skills[];
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

export interface ServerError {
  message: string;
  errorCode: number;
}