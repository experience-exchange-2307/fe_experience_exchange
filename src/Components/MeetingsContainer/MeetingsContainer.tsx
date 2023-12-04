import React from "react";
import "./MeetingsContainer.css";
import MeetingCards from "Components/MeetingCards/MeetingCards";
import { CurrentUser } from "types";

interface MeetingProps {
  currentUser: CurrentUser | undefined;
}

const meetings ={
  "data": [
    {
      "id": "23",
      "type": "meeting",
      "attributes": {
        "partner_id": "2",
        "date": "01-01-2023",
        "start_time": "07:30",
        "end_time": "08:30",
        "is_host": "true"
      }
    },
    {
      "id": "27",
      "type": "meeting",
      "attributes": {
        "partner_id": "3",
        "date": "01-05-2023",
        "start_time": "11:00",
        "end_time": "11:30",
        "is_host": "false"
      }
    }
  ]
}

// function MeetingsContainer({ currentUser }: MeetingProps) {
//   const meetings = currentUser?.attributes.meetings || [];

//   return (
//     <div className="meetings-container">
//       {!!meetings.length ? (
//         <MeetingCards meetings={meetings} />
//       ) : (
//         <h2>No meetings yet, add meetings!</h2>
//       )}
//     </div>
//   );
// }

// export default MeetingsContainer;
