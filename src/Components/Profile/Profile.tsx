import "./Profile.css";
import { CurrentUser } from "types";
import frog from "../../images/Frog.png";
import Skill from "Components/Skill/Skill";
interface ProfileProps {
  currentUser: CurrentUser | undefined;
}

// use params of dashboard for user id => 
// on dashboard mount fetch user data (using userid from params)
// pass user to profile as prop

function Profile({ currentUser }: ProfileProps) {
  return (
    <div className='profile-page'>
      <div className='profile-banner'></div>
      <div className='profile-container'>
        <div className='profile-container-upper'>
          <div className='profile-icon-container'>
            <img src={frog} alt='user icon' className='profile-icon'></img>
          </div>
          <p className='profile-name'>
            {currentUser?.attributes.first_name}{" "}
            {currentUser?.attributes.last_name}
          </p>
        </div>
        <div className='profile-lower-alignment'>
          <div className='profile-container-lower'>
            <div className='profile-lower-left'>
              <p className='profile-header'>About me</p>
              <p>{currentUser?.attributes.about}</p>
            </div>
            <div className='profile-lower-right'>
              <article className="profile-list">
                <p className='profile-header profile-skill-container'>Skills</p>
                <Skill />
              </article>
              <article className="profile-list">
                <p className='profile-header'>Location</p>
                <p>{currentUser?.attributes.address.city}, {currentUser?.attributes.address.state}</p>
              </article>
              <article className="profile-list">
                <p className='profile-header'>Email</p>
                <p>{currentUser?.attributes.email}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
