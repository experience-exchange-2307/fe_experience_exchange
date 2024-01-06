import MeetingCards from "Components/MeetingCards/MeetingCards";
import { deleteMeeting, patchMeetings } from "apiCalls";
import { Meeting } from "types";

interface MeetingsProps {
  meetings: Meeting[];
  onMeetingsUpdate: () => void;
  updateIsAccepted: (newValue: boolean) => void;
}

export function MeetingRequests({
  meetings,
  onMeetingsUpdate,
  updateIsAccepted,
}: MeetingsProps) {
  const meetingRequests = meetings.filter(
    (meeting) => (meeting.attributes.is_accepted !== true) && (meeting.attributes.is_host !== true)
    // so there is already a filter, but I need to differentiate between if *on currentUser dash, if host !== currentUser*
    // this could be where I use a 'pending' component as the else condition
  );
  // accept handler => sends meetings patch
  const handleAccept = (meetingId: number) => {
    patchMeetings(meetingId)
      .then(() => {
        onMeetingsUpdate();
        updateIsAccepted(true);
      })
      .catch((error) => {
        console.error("Error during accept:", error);
      });
  };

  // deny handler => sends meeting delete
  const handleReject = (meetingId: number) => {
    deleteMeeting(meetingId)
      .then(() => {
        updateIsAccepted(true);
        onMeetingsUpdate();
      })
      .catch((error) => {
        console.error("Error during reject:", error);
      });
  };

  return (
    <MeetingCards
      meetings={meetingRequests}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
