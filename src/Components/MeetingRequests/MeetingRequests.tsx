import MeetingCards from "Components/MeetingCards/MeetingCards";
import { Meeting } from "types";

interface MeetingsProps {
  meetings: Meeting[];
}

export function MeetingRequests({ meetings }: MeetingsProps) {
  const meetingRequests = meetings.filter(
    (meeting) => meeting.attributes.is_accepted !== true
  );

  return <MeetingCards meetings={meetingRequests} />;
}