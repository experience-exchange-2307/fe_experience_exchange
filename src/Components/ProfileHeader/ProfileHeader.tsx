import "./ProfileHeader.css";
import { CurrentUser } from "types";
import frog from "../../images/Frog.png";


interface ProfileHeaderProps {
  currentUser: CurrentUser | undefined;
}
function ProfileHeader({currentUser}: ProfileHeaderProps) {
  return (
    <div className='profile-container-upper'>
          <div className='profile-icon-container'>
            <img src={frog} alt='user icon' className='profile-icon'></img>
          </div>
          <p className='profile-name'>
            {currentUser?.attributes.first_name}{" "}
            {currentUser?.attributes.last_name}
          </p>
        </div>
  )
}

export default ProfileHeader
