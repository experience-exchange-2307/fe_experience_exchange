import Profile from 'Components/Profile/Profile';
import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser } from 'types';
import { getSingleUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';

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
    <>
      <Nav />
    <main>
      <Routes>
      {!currentUser ? (
        <Route path="/" element={<p>Loading...</p>} />
      ) : (
       <Route path="/" element={<Profile currentUser={currentUser} />}
        /> )
      }
      <Route path="*" element={<ErrorPage />} />
        </Routes>
    </main>
    </>
  );
}

export default App;
