import "./Profile.css";
import { CurrentUser } from "types";
import Skill from "Components/Skill/Skill";
interface ProfileProps {
  currentUser: CurrentUser;
  currentUserId: number;
}

function Profile({ currentUser, currentUserId }: ProfileProps) {
  console.log('currentUser', currentUser);
  return (
    <div className="profile-container">
      <div className="profile-container-lower">
        <div className="profile-left">
          <article className="profile-list">
            <p className="profile-header profile-about">About me</p>
            <p className="profile-about-text">{currentUser?.attributes.about}</p>
          </article>
          <article className="profile-list">
            <p className="profile-header profile-location">Location</p>
            <p className="profile-location-text">
              {currentUser?.attributes.address.city},{" "}
              {currentUser?.attributes.address.state}
            </p>
          </article>
          <article className="profile-list">
            <p className="profile-header profile-email">Email</p>
            <p className="profile-email-text">{currentUser?.attributes.email}</p>
          </article>
        </div>
        <div className="profile-right">
          <article className="profile-list">
            <p className="profile-header profile-skill-container">Skills</p>
            <Skill currentUser={currentUser} currentUserId={currentUserId} />
          </article>
        </div>
      </div>
    </div>
  );
}

export default Profile;
