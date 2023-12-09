import MeetingCards from "Components/MeetingCards/MeetingCards";
import { useEffect, useState } from "react";
import { Meeting } from "types";

interface MeetingsProps {
  meetings: Meeting[];
}

// interface AcceptedMeetingsProps extends MeetingsProps {
//   setHasAcceptedMeetings: Function;
// }

const filterAcceptedMeetings = (meetings: Meeting[]): Meeting[] => {
  return meetings.filter((meeting) => meeting.attributes.is_accepted === true);
};

export function AcceptedMeetings({
  meetings,
}: MeetingsProps) {
  const [acceptedMeetings, setAcceptedMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    setAcceptedMeetings(filterAcceptedMeetings(meetings));
  }, [meetings]);

  return <MeetingCards meetings={acceptedMeetings} />;
}
