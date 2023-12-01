import Profile from 'Components/Profile/Profile';
import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser } from 'types';
import { getSingleUser } from 'apiCalls';

// interface AppState {
//   currentUser: 
// }

function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
  // on load => Get user (entire object)
  useEffect(() => {
    getSingleUser().then((data) => {
      console.log("data", data);
      setCurrentUser(data);
    })
  }, [])
  return (
    <div>
      {!currentUser ? (
        <p>Loading...</p>)  :
       ( <Profile currentUser={currentUser} /> )
      }
    </div>
  );
}

export default App;
