import { useState } from "react";
import "./MeetingsContainer.css";
import MeetingCards from "Components/MeetingCards/MeetingCards";

interface Meeting {
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

interface MeetingsContainerProps {
  meetings: Meeting[];
}
//  I need to render only accepted cards on window load,
// a toggle system to go between approved and requests
// conditional rendering based on toggle state

function MeetingsContainer({ meetings }: MeetingsContainerProps) {
  const [isAccepted, setIsAccepted] = useState<boolean>(true);
// I am going to bring in all meeting data ([{}, {}, ...] | []) 
//  2 views on Meetings container =>
//    my meetings
//    my meeting requests
// use state boolean as render condition (isAccepted?)
// have button that toggles state
// I am going to conditionally render based on isAccepted =>
// true: my meetings: <MeetingCards acceptedMeetings={acceptedMeetings} />
// false: requests: <MeetingCards meetingRequests={meetingRequests} />

const acceptedMeetings = meetings.filter(
  (meeting) => meeting.attributes.is_accepted === true
);
const meetingRequests = meetings.filter(
  (meeting) => meeting.attributes.is_accepted !== true
);

  return (
    <div className="meetings-container">
      <button onClick={() => setIsAccepted(true)}>My Meetings</button>
      <button onClick={() => setIsAccepted(false)}>My Meeting Requests</button>
      {!!meetings.length ? (
        isAccepted ? (
          <MeetingCards meetings={acceptedMeetings} />
        ) : (
          <MeetingCards meetings={meetingRequests} />
        )
      ) : (
        <h2>No meetings yet, add meetings!</h2>
      )}
    </div>
  );
}

export default MeetingsContainer;
