import dayjs from "dayjs";
import "./MeetingCards.css";
import { Meeting } from "types";
import { Link } from "react-router-dom";
import { useTheme } from "Contexts/ThemeContext";

interface MeetingCardsProps {
  meetings: Meeting[];
  onAccept?: (meetingId: number) => void;
  onReject?: (meetingId: number) => void;
}

const MeetingCards: React.FC<MeetingCardsProps> = ({
  meetings,
  onAccept,
  onReject,
}) => {
  const { isDarkMode } = useTheme();

  function trimLeadingZero(time: string): string {
    if (time.length > 0 && time.charAt(0) === "0") {
      return time.substring(1);
    }
    return time;
  }
  return (
    <div className='meeting-card-wrapper'>
      {meetings.map((meeting) => {
        const formattedDate = dayjs(meeting.attributes.date).format("MMM. D");
        const formattedStartTime = trimLeadingZero(
          meeting.attributes.start_time
        );
        const formattedEndTime = trimLeadingZero(meeting.attributes.end_time);
        const isPending =
          !meeting.attributes.is_accepted && !meeting.attributes.is_host;

        return (
          // Want to make Partner: {meeting.attributes.partner_name} a link to partner's
          <div
            key={meeting.id}
            className={`meeting-card ${
              isDarkMode ? "light" : "dark"
            } bg-LHTModeMeetingCardBG rounded-lg dark:bg-DRKModeTertiaryBG dark:text-DRKModePrimaryText`}
          >
            {!meeting.attributes.is_accepted ? (
              isPending ? (
                <div className='meeting-card-pending meeting-card-content'>
                  <h3>PENDING</h3>
                  <p>{formattedDate}</p>
                  <p>
                    {formattedStartTime} - {formattedEndTime}
                  </p>
                  <Link to={`/dashboard/${meeting.attributes.partner_id}`}>
                    <p>Partner: {meeting.attributes.partner_name}</p>
                  </Link>
                  <p>Meeting pending, waiting on partner to respond</p>
                </div>
              ) : (
                <div className='meeting-card-request meeting-card-content '>
                  <h3>REQUEST</h3>
                  <p>{formattedDate}</p>
                  <p>
                    {formattedStartTime} - {formattedEndTime}
                  </p>
                  <Link to={`/dashboard/${meeting.attributes.partner_id}`}>
                    <p>Partner: {meeting.attributes.partner_name}</p>
                  </Link>
                  <div className='meeting-card-btn-container'>
                    <button
                      onClick={() => onAccept?.(meeting.id)}
                      className='meeting-card-btn'
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onReject?.(meeting.id)}
                      className='meeting-card-btn'
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className='meeting-card-content bg-LHTModeMeetingCardBG rounded-lg dark:bg-DRKModeTertiaryBG dark:text-DRKModePrimaryText'>
                <p>{formattedDate}</p>
                <p>
                  {formattedStartTime} - {formattedEndTime}
                </p>
                <Link to={`/dashboard/${meeting.attributes.partner_id}`}>
                  <p className='text-indigo-900 hover:text-blue-700'>
                    Partner: {meeting.attributes.partner_name}
                  </p>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MeetingCards;
