import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import { getMeetingsByUser, getSingleUser } from "apiCalls";
import { createBrowserHistory } from "history"; 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import BackButton from "Components/BackButton/BackButton";
import './Dashboard.css'

const history = createBrowserHistory();

interface CurrentUserProps {
  currentUser: CurrentUser;
}

function Dashboard({ currentUser }: CurrentUserProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(true);
  const [dashboardData, setDashboardData] = useState<CurrentUser>();
  const [showBackButton, setShowBackButton] = useState<Boolean>(false);
  const userIdFromUrl = Number(id);
  const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);

  useEffect(() => {
    setShowBackButton( history.location.pathname.includes("/search"));

    if (!isCurrentUserDashboard) {
      getSingleUser(userIdFromUrl)
        .then((data) => {
          setDashboardData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    getMeetingsByUser(currentUser.id)
      .then((meetings) => {
        setUserMeetings(meetings.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });

    setIsCurrentUser(isCurrentUserDashboard);
  }, [userIdFromUrl, isCurrentUserDashboard, currentUser.id]);

  return (
    <>
    <div className="dashboard-outermost-wrapper">

    <div className="dashboard-wrapper">
      {!isCurrentUser && dashboardData ? (
        <div className="other-user-dash">
                {showBackButton && <BackButton />}
          <ProfileHeader currentUser={dashboardData} />
          <Profile currentUser={dashboardData} />
          <RequestMeetingForm currentUserId={currentUser.id} />
        </div>
      ) : null}

      {isCurrentUser && (
        <div className="current-user-dash">
          <ProfileHeader currentUser={currentUser} />
          <Profile currentUser={currentUser} />
          <MeetingsContainer meetings={userMeetings} />
        </div>
      )}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
