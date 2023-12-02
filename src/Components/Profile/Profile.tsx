import "./Profile.css"
import React from "react";
import { CurrentUser } from "types";

interface ProfileProps {
  currentUser: CurrentUser | undefined;
}

function Profile({ currentUser }: ProfileProps) {
  return (
    <div className="profile-container">
      <p>{currentUser?.attributes.first_name}</p>
    </div>
  );
}

export default Profile;
