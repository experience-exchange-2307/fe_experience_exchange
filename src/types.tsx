interface Skills {
  name: String
  proficiency: Number;
}

interface Meetings {
  id: Number;
  date: String;
  start_time: String;
  end_time: String;
  is_accepted: Boolean;
  purpose: String;
}

interface Attributes {
  first_name: String;
  last_name: String;
  email: String;
  address: String;
  about: String;
  lat: String;
  lon: String;
  isRemote: Boolean;
  skills: Skills;
  meetings: Meetings;
}

export interface CurrentUser{
  id: Number;
  type: String;
  attributes: Attributes;
}

