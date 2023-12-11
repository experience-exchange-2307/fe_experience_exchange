import "./ProfileHeader.css";
import { CurrentUser } from "types";
import frog from "../../images/Frog.png";

interface ProfileHeaderProps {
  currentUser: CurrentUser;
}
function ProfileHeader({ currentUser }: ProfileHeaderProps) {
  return (
    <div className='profile-container-upper'>
      <div className='profile-icon-container'>
        {currentUser.attributes.profile_picture ? (
          <img
            src={currentUser.attributes.profile_picture}
            alt='user icon'
            className='profile-icon'
          ></img>
        ) : (
          <img src={frog} alt='user icon' className='profile-icon'></img>
        )}
      </div>
      <p className='profile-name'>
        {currentUser?.attributes.first_name} {currentUser?.attributes.last_name}
      </p>
    </div>
  );
}

export default ProfileHeader;
