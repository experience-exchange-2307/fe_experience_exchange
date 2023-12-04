import React from "react";
import "./MeetingCard.css";

interface Meeting {
  id: number;
  type: string;
  attributes: {
    partner_id: number;
    date: string;
    start_time: string;
    end_time: string;
    is_host: string;
  };
}

interface MeetingCardsProps {
  meetings: Meeting[];
}

const meetings =  [
    {
      id: 23,
      type: "meeting",
      attributes: {
        partner_id: 2,
        date: "01-01-2023",
        start_time: "07:30",
        end_time: "08:30",
        is_host: "true"
      }
    },
    {
      id: 27,
      type: "meeting",
      attributes: {
        partner_id: 3,
        date: "01-05-2023",
        start_time: "11:00",
        end_time: "11:30",
        is_host: "false"
      }
    }
  ]

//  I need to render only accepted cards on window load, 
// a toggle system to go between approved and requests
// conditional rendering based on toggle state
const MeetingCards: React.FC<MeetingCardsProps> = (meetings) => {
  // reduce??? 
  return meetings.map((meeting) => {
    // conditional check for accepted/rejected???
    return (
      <div className="meeting-card">

      </div>
    )
  })
}

export default MeetingCards;

// "meetings": [
//   {
//     "meeting_id": 13,
//     "date": "2023-12-02",
//     "start_time": "2023-12-03T14:38:11.000Z",
//     "end_time": "2023-12-04T19:33:15.000Z",
//     "requesting_user_name": "Nancy Johnson",
//     "requesting_user_id": 3,
//     "is_accepted": false,
//     "purpose": "casual"
//   }
// ]

// function EncounterCards({ encounters, addEncounter }) {
//   return encounters.map((encounter) => {
//     return (
//       <Card
//         source={encounter.source}
//         description={encounter.description}
//         id={encounter.id}
//         key={encounter.id}
//         addEncounter={addEncounter}
//       />
//     );
//   });
// }