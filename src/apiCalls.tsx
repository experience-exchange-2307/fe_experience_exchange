import { NewUserData } from 'types';
// const BaseURLMock = 'https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io'
const BaseURLProd = 'https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com'

export const getSingleUser = () => {
  return fetch(
    `${BaseURLProd}/api/v1/users/1`
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} Something went wrong, user not found.`
        );
      }
    })
    .then((res) => res.json());
};

export const getSearchResults = (query: string) => {
  return fetch(
    `${BaseURLProd}/api/v1/search_skills?query=${query}&user_id=1`  // this is hardcoded to the currentUser id.  we'll update it to be dynamic later. 
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} Something went wrong, user not found.`
        );
      }
    })
    .then((res) =>res.json());
};


export const postNewUser = (newUserData: NewUserData) => {
  return fetch(`${BaseURLProd}/api/v1/users/`, {
    method: "POST",
    body: JSON.stringify(newUserData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    if(res.ok) {
      return res
    } else {
      throw new Error(`${res.status} Something went wrong, user not found.`)
    }
  })
  .then(res => res.json())
}