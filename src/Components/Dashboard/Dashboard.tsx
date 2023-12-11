import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMeetingsByUser, getSingleUser } from "apiCalls";
import { createBrowserHistory } from "history";
import { CurrentUser } from "types";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import BackButton from "Components/BackButton/BackButton";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import './Dashboard.css';

const history = createBrowserHistory();

interface DashboardProps {
  currentUser: CurrentUser;
  errorFromServer: { status: number; message: string } | null;
  setServerError: React.Dispatch<React.SetStateAction<{ status: number; message: string } | null>>;
}

function Dashboard({
  currentUser,
  errorFromServer,
  setServerError,
}: DashboardProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<CurrentUser | null>(null);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const userIdFromUrl = Number(id);
  const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);

  useEffect(() => {
    setShowBackButton(history.location.pathname.includes("/search"));
  
    const fetchData = () => {
      if (!isCurrentUserDashboard) {
        getSingleUser(userIdFromUrl)
          .then((data) => {
            setDashboardData(data.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setServerError(error as { status: number; message: string } | null);
          });
        } else {
          // If it's the current user's dashboard, set the dashboard data to current user
          setDashboardData(currentUser);
      }
  
      getMeetingsByUser(currentUser.id)
        .then((meetings) => {
          setUserMeetings(meetings.data);
          setIsCurrentUser(isCurrentUserDashboard);
        })
        .catch((error) => {
          console.error("Error fetching meetings:", error);
          setServerError(error as { status: number; message: string } | null);
        });
    };
  
    fetchData();
  }, [userIdFromUrl, isCurrentUserDashboard, currentUser, setServerError]);
  

  return (
    <div className="dashboard-outermost-wrapper">
      {errorFromServer ? (
        <ErrorPage serverError={errorFromServer} />
      ) : (
        <div className="dashboard-wrapper">
          {!isCurrentUser && dashboardData ? (
            <div className="other-user-dash">
              {showBackButton && <BackButton />}
              <ProfileHeader currentUser={dashboardData} />
              <Profile currentUser={dashboardData} currentUserId={currentUser.id} />
              <RequestMeetingForm currentUserId={currentUser.id} />
            </div>
          ) : null}

          {isCurrentUser && (
            <div className="current-user-dash">
              <ProfileHeader currentUser={currentUser} />
              <Profile currentUser={currentUser} currentUserId={currentUser.id} />
              <MeetingsContainer
                meetings={userMeetings}
                currentUser={currentUser}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
