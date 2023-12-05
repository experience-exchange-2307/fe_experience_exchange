import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import { getMeetingsByUser } from "apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";

interface CurrentUserProps {
  currentUser: CurrentUser;
}

function Dashboard({ currentUser }: CurrentUserProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(true);
  const userIdFromUrl = Number(id);
  useEffect(() => {
      console.log('curUser', id);

      getMeetingsByUser(currentUser.id)
        .then((meetings) => {
          setUserMeetings(meetings.data);
        })
        .catch((error) => {
          console.error("Error fetching meetings:", error);
        })
    
  console.log('parsedUserId', userIdFromUrl);

        const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);
    
        setIsCurrentUser(isCurrentUserDashboard);
  }, [currentUser.id, userIdFromUrl]);

  return (
    <div className="dashboard-wrapper">
      <Profile currentUser={currentUser} />
      {isCurrentUser && (
        <div className="current-user-dash">
          {/* <Skills /> */}
          <MeetingsContainer meetings={userMeetings} />
        </div>
      )}  
      {!isCurrentUser && (
        <div className="other-user-dash">
          {/* <Skills /> ???? idk */}
          <RequestMeetingForm />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
