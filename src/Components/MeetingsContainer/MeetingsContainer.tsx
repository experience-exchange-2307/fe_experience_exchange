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
  const [hasAcceptedMeetings, setHasAcceptedMeetings] = useState<boolean>(true);
  const showAccepted = isAccepted && hasAcceptedMeetings;
  const meetingText = (bool: Boolean) =>
    bool ? "My Meetings" : "My Meeting Requests";

  const MeetingComponent = () => !!isAccepted ? (
    <AcceptedMeetings
      meetings={meetings}
      setHasAcceptedMeetings={setHasAcceptedMeetings}
    />
  ) : (
    <MeetingRequests meetings={meetings} />
  );

    const handleClick = () => setIsAccepted(!isAccepted)

  return (
    <div className="meetings-container">
      <h2>{meetingText(showAccepted)}</h2>

      <button onClick={handleClick}>
        {meetingText(!showAccepted)}
      </button>

      {!!meetings.length ? (
        <MeetingComponent />
      ) : (
        <h2>No meetings yet, add meetings!</h2>
      )}
    </div>
  );
}

export default MeetingsContainer;
