import React from "react";
import "./MeetingCards.css";
import { Meeting } from "types";
import { deleteMeeting, patchMeetings } from "apiCalls";

interface MeetingCardsProps {
  meetings: Meeting[];
}

// accept handler => sends meetings patch
const handleAccept = (meetingId: number) => {
  patchMeetings(meetingId);
};
// deny handler => sends meeting delete
const handleReject = (meetingId: number) => {
  deleteMeeting(meetingId);
};

const MeetingCards: React.FC<MeetingCardsProps> = ({ meetings }) => {
  return (
    <div>
      {meetings.map((meeting) => {
        return (
          <div key={meeting.id} className="meeting-card">
            {!meeting.attributes.is_accepted && (
              <div className='meeting-card-requests'>
                <h3>REQUEST</h3>
                <button onClick={() => handleAccept(meeting.id)} className='meeting-card-btn'>Accept</button>
                <button onClick={() => handleReject(meeting.id)} className='meeting-card-btn'>
                  Decline
                </button>
              </div>
            )}
            <p>Date: {meeting.attributes.date}</p>
            <p>
              Time: {meeting.attributes.start_time} -{" "}
              {meeting.attributes.end_time}
            </p>
            {/* do fetch for partner name? or ask BE if they can add a name to meeting data */}
            <p>Partner ID: {meeting.attributes.partner_id}</p>
          </div>
          
        );
      })}
    </div>
  );
};

export default MeetingCards;
