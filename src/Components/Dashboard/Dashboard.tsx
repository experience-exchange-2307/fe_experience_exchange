import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import {
  getMeetingsByUser,
  // getSingleUser
} from "apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import './Dashboard.css'

interface CurrentUserProps {
  currentUser: CurrentUser;
}

function Dashboard({ currentUser }: CurrentUserProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(true);
  // const [dashboardData, setDashboardData] = useState<CurrentUserProps>()
  const userIdFromUrl = Number(id);
  useEffect(() => {
    // getSingleUser(currentUser.id).then((data) => {
    //   console.log("data", data.data);
    //   setDashboardData(data.data)
    // })
    getMeetingsByUser(currentUser.id)
      .then((meetings) => {
        setUserMeetings(meetings.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });

    const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);

    setIsCurrentUser(isCurrentUserDashboard);
  }, [currentUser.id, userIdFromUrl]);

  return (
    <div className='dashboard-outermost-wrapper'>

    <div className="dashboard-wrapper">
      <ProfileHeader currentUser={currentUser} />
      <Profile currentUser={currentUser} />
      {isCurrentUser && (
        <div className="current-user-dash">
          <MeetingsContainer meetings={userMeetings} />
        </div>
      )}
      {!isCurrentUser && (
        <div className="other-user-dash">
          <RequestMeetingForm currentUserId={currentUser.id} />
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
