import "./Profile.css";
import { CurrentUser } from "types";
import frog from "../../images/Frog.png";
import SkillForm from "Components/SkillForm/SkillForm";
import ProgressBar from "@ramonak/react-progress-bar";
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
                {currentUser?.attributes.skills.map((skill, index) => (
                  <div key={`skill-wrapper-${index}`}>
                  <p className='profile-skill' key={index}>
                    {skill.name}
                  </p>
                  <ProgressBar
                    className='progress-bar'
                    completed={skill.proficiency}
                    bgColor="#3e3b40"
                    height="7px"
                    isLabelVisible={false}
                    baseBgColor="#cecece"
                    labelColor="#fa0000"
                    animateOnRender
                    maxCompleted={5}
                    />
              </div>
                ))}
              </article>
              <article className="profile-list">
                <p className='profile-header profile-skill-container'>Add New Skill</p>
                {<SkillForm />}
                </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
