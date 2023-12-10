import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import { getMeetingsByUser, getSingleUser } from "apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import './Dashboard.css'
import { serialize } from "v8";

interface CurrentUserProps {
  currentUser: CurrentUser; 
  setServerError: (error: string) => void;
}

function Dashboard({ currentUser, setServerError }: CurrentUserProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(true);
  const [dashboardData, setDashboardData] = useState<CurrentUser>();
  const userIdFromUrl = Number(id);
  const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);

  useEffect(() => {
    if (!isCurrentUserDashboard) {
      getSingleUser(userIdFromUrl)
        .then((data) => {
          setDashboardData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          return setServerError(error)
        });
    }

    getMeetingsByUser(currentUser.id)
      .then((meetings) => {
        setUserMeetings(meetings.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
        return setServerError(error)
      });

    setIsCurrentUser(isCurrentUserDashboard);
  }, [userIdFromUrl, isCurrentUserDashboard, currentUser.id]);

  return (
    <>
    <div className="dashboard-outermost-wrapper">

    <div className="dashboard-wrapper">
      {!isCurrentUser && dashboardData ? (
        <div className="other-user-dash">
          <ProfileHeader currentUser={dashboardData} />
          <Profile currentUser={dashboardData} setServerError={setServerError}/>
          <RequestMeetingForm currentUserId={currentUser.id} setServerError={setServerError}/>
        </div>
      ) : null}

      {isCurrentUser && (
        <div className="current-user-dash">
          <ProfileHeader currentUser={currentUser} />
          <Profile currentUser={currentUser} setServerError={setServerError}/>
          <MeetingsContainer meetings={userMeetings} />
        </div>
      )}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
