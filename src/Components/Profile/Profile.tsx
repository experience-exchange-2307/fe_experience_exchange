import { type } from "os";
import React from "react";
import { CurrentUser } from "types";

interface ProfileProps {
  currentUser: CurrentUser | undefined;
}

function Profile({ currentUser }: ProfileProps) {
  return (
    <div>
      <p>{currentUser?.attributes.first_name}</p>
    </div>
  );
}

export default Profile;
