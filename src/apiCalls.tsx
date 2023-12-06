import { NewUserData } from 'types';
// const BaseURLMock = 'https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io'
const BaseURLReal = 'https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com/'
export const getSingleUser = () => {
  return fetch(
    `${BaseURLReal}/api/v1/users/1`
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, user not found.`
        );
      }
    })
    .then((res) => res.json());
};

export const getSearchResults = (query: string) => {
  return fetch(
    `${BaseURLReal}/api/v1/search_skills?query=${query}` )
    .then((res) => {
      console.log('res1', res)
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, user not found.`
        );
      }
    })
    .then((res) =>res.json());
};
export const getSearchResultsEmpty = () => {
  return fetch(
    `${BaseURLReal}/api/v1/search_skills?query=` )
    .then((res) => {
      console.log('res2', res)
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, user not found.`
        );
      }
    })
    .then((res) =>res.json());
};


export const postNewUser = (newUserData: NewUserData) => {
  return fetch("https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/users/", {
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
      throw new Error(`${res.status} ${res.statusText} Something went wrong, user not found.`)
    }
  })
  .then(res => res.json())
}