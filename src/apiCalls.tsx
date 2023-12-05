import { NewUserData } from 'types';

export const getSingleUser = () => {
  return fetch(
    "https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/users/1"
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
    .then((response) =>{
      console.log('res', response.json)
      return response.json()});
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