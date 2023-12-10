import MeetingCards from "Components/MeetingCards/MeetingCards";
import { deleteMeeting, patchMeetings } from "apiCalls";
import { Meeting } from "types";

interface MeetingsProps {
  meetings: Meeting[];
  onMeetingsUpdate: () => void;
}

export function MeetingRequests({ meetings, onMeetingsUpdate }: MeetingsProps) {
  const meetingRequests = meetings.filter(
    (meeting) => meeting.attributes.is_accepted !== true
  );
  // accept handler => sends meetings patch
  const handleAccept = (meetingId: number) => {
    patchMeetings(meetingId);
    onMeetingsUpdate();
  };
  // deny handler => sends meeting delete
  const handleReject = (meetingId: number) => {
    deleteMeeting(meetingId);
    onMeetingsUpdate();
  };
  

  return <MeetingCards meetings={meetingRequests} onAccept={handleAccept} onReject={handleReject} />;
}