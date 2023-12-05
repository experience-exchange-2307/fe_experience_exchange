import React from "react";
import "./MeetingCards.css";
import { Meeting } from "types";

interface MeetingCardsProps {
  meetings: Meeting[];
}

// accept handler => sends meetings patch
const handleAccept = () => {
  // meetingPatch() from apicalls
}
// deny handler => sends meeting delete
const handleReject = () => {
  // meetingDelete() from apicalls
}

const MeetingCards: React.FC<MeetingCardsProps> = ({ meetings }) => {
  return (
    <div>
      {meetings.map((meeting) => <div key={meeting.id} className="meeting-card">
        {/* if is_accepted = false => render <h3>REQUEST</h3> AND accept request buttons */}
        </div>)}
    </div>
  );
};

export default MeetingCards;
