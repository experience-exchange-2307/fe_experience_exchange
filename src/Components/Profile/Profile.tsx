import "./Profile.css";
import { CurrentUser } from "types";
import Skill from "Components/Skill/Skill";

interface ProfileProps {
  currentUser: CurrentUser | undefined;
}

// use params of dashboard for user id => 
// on dashboard mount fetch user data (using userid from params)
// pass user to profile as prop

function Profile({ currentUser }: ProfileProps) {
  return (

      
        <div className='profile-lower-alignment'>
          <div className='profile-container-lower'>
            <div className='profile-lower-left'>
            <article className="profile-list">
              <p className='profile-header'>About me</p>
              <p>{currentUser?.attributes.about}</p>
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
            <div className='profile-lower-right'>
              <article className="profile-list">
                <p className='profile-header profile-skill-container'>Skills</p>
                <Skill />
              </article>
            </div>
          </div>
          </div>
  );
}

export default Profile;
