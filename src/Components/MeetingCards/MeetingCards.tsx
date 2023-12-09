import React from "react";
import dayjs from "dayjs";
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
  function trimLeadingZero(time: string): string {
    if (time.length > 0 && time.charAt(0) === "0") {
      return time.substring(1);
    }
    return time;
  }
  return (
    <div>
      {meetings.map((meeting) => {
        const formattedDate = dayjs(meeting.attributes.date).format("MMM. D");
        const formattedStartTime = trimLeadingZero(
          meeting.attributes.start_time
        );
        const formattedEndTime = trimLeadingZero(meeting.attributes.end_time);

        return (
          <div key={meeting.id} className='meeting-card'>
            {!meeting.attributes.is_accepted ? (
              <div className='meeting-card-request meeting-card-content'>
                <h3>REQUEST</h3>
                <p>{formattedDate}</p>
                <p>
                  {formattedStartTime} - {formattedEndTime}
                </p>
                {/* do fetch for partner name? or ask BE if they can add a name to meeting data */}
                <p>Partner ID: {meeting.attributes.partner_id}</p>
                <div className='meeting-card-btn-container'>
                  <button
                    onClick={() => handleAccept(meeting.id)}
                    className='meeting-card-btn'
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(meeting.id)}
                    className='meeting-card-btn'
                  >
                    Decline
                  </button>
                </div>
              </div>
            ) : (
              <div className='meeting-card-content'>
                <p>{formattedDate}</p>
                <p>
                  {formattedStartTime} - {formattedEndTime}
                </p>
                {/* do fetch for partner name? or ask BE if they can add a name to meeting data */}
                <p>Partner ID: {meeting.attributes.partner_id}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MeetingCards;
