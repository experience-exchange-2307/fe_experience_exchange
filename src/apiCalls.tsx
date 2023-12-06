export const getSingleUser = () => {
  return fetch(
    "https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/users/1"
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          `${res.status} ${res.statusText}. Something went wrong, User not found.`
        );
      }
    })
    .then((response) => {
      console.log("res", response.json);
      return response.json();
    });
};

export const getMeetingsByUser = (userId: Number) => {
  return fetch(
    `https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/meetings?user_id=${userId}`
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
  return fetch(`https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/meetings?user_id=${meetingId}`, {
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
  return fetch(`https://52d193d3-3f59-4c9e-9d04-d920641190d0.mock.pstmn.io/api/v1/meetings?user_id=${meetingId}`, {
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