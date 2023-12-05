import { useState } from "react";
import "./MeetingsContainer.css";
import MeetingCards from "Components/MeetingCards/MeetingCards";
import { Meeting } from "types";

interface MeetingsContainerProps {
  meetings: Meeting[];
}

function MeetingsContainer({meetings}: MeetingsContainerProps) {
  const [isAccepted, setIsAccepted] = useState<boolean>(true);
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
