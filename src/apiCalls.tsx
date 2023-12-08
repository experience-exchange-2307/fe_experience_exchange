import { NewUserData } from 'types';
// const BaseURLMock = 'https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io'
const BaseURLProd = 'https://be-experience-exchange-b6ae91ef3c0f.herokuapp.com'

export const getSingleUser = (currentUserID: number) => {
  return fetch(
    `${BaseURLProd}/api/v1/users/${currentUserID}`
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

export const getSearchResults = (query: string, currentUserID:number) => {
  console.log(`${BaseURLProd}/api/v1/search_skills?query=${query}&user_id=${currentUserID}`)
  if (!currentUserID){currentUserID = 14}
  return fetch(
    `${BaseURLProd}/api/v1/search_skills?query=${query}&user_id=${currentUserID}`

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
      throw new Error(`${res.status} Something went wrong, unable to create new account.`)
    }
  })
  .then(res => res.json())
}

export const getMeetingsByUser = (userId: Number) => {
  console.log('meetings endpoint',  `${BaseURLProd}/api/v1/users/${userId}/meetings`)
  return fetch(
    `${BaseURLProd}/api/v1/users/${userId}/meetings`
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, Meetings not found.`
        );
      }
    })
    .then((response) => response.json());
};

const patchData = {
  is_approved: true,
};

export const patchMeetings = (meetingId: number) => {
  return fetch(`${BaseURLProd}/api/v1/meetings?user_id=${meetingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Patch request successful:", data);
    })
    .catch((error) => {
      console.error("Error during patch request:", error);
    });
};

export const deleteMeeting = (meetingId: number) => {
  return fetch(`${BaseURLProd}/api/v1/meetings?user_id=${meetingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Delete request successful:", data);
    })
    .catch((error) => {
      console.error("Error during delete request:", error);
    });
};