import "./Profile.css"
import React from "react";
import { CurrentUser } from "types";
import frog from "../../images/Frog.png"
interface ProfileProps {
  currentUser: CurrentUser | undefined;
}

function Profile({ currentUser }: ProfileProps) {
  return (
    <div className="profile-container">
      <p>{currentUser?.attributes.first_name}</p>
      <img src={frog} alt='user icon'></img>
    </div>
  );
}

export default Profile;
