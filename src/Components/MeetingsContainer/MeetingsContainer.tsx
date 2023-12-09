import { useState } from "react";
import "./MeetingsContainer.css";
import { Meeting } from "types";
import { AcceptedMeetings } from "Components/AcceptedMeetings/AcceptedMeetings";
import { MeetingRequests } from "Components/MeetingRequests/MeetingRequests";

interface MeetingsProps {
  meetings: Meeting[];
}

function MeetingsContainer({ meetings }: MeetingsProps) {
  const [isAccepted, setIsAccepted] = useState<boolean>(true);
  
  const meetingText = (bool: Boolean) =>
    bool ? "My Meetings" : "My Meeting Requests";

  const MeetingComponent = () =>
    !!isAccepted ? (
      <AcceptedMeetings
        meetings={meetings}
      />
    ) : (
      <MeetingRequests meetings={meetings} />
    );

  const handleClick = () => setIsAccepted(!isAccepted);

  return (
    <div className="meetings-container">
      <h2>{meetingText(isAccepted)}</h2>

      {!!meetings.length ? (
        <MeetingComponent />
      ) : (
        <h2>No meetings yet, add meetings!</h2>
      )}

      <button className="meetings-toggle" onClick={handleClick}>{meetingText(!isAccepted)}</button>
    </div>
  );
}

export default MeetingsContainer;
