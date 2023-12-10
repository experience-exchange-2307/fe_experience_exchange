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
      <div className="meetings-container-top">

      <h2 className='meetings-title'>{meetingText(isAccepted)}</h2>
      <button className="meetings-toggle meeting-card-btn" onClick={handleClick}>{meetingText(!isAccepted)}</button>
      </div>

      
      {!!meetings.length ? (
          <MeetingComponent />
          ) : (
            <h2>No meetings yet, add meetings!</h2>
            )}
  

    </div>
  );
}

export default MeetingsContainer;
