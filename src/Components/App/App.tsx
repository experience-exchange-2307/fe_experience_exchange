import Profile from 'Components/Profile/Profile';
import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser, NewUserData } from 'types';
import { getSingleUser, postNewUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';

function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
  // on load => Get user (entire object)
  useEffect(() => {
    getSingleUser().then((data) => {
      console.log("data", data.data);
      setCurrentUser(data.data);
    })
  }, [])

  const createNewUser = (newUserData: NewUserData) => {
    postNewUser(newUserData)
    .then(data => {
      console.log("posted user", data)
      // setCurrentUser(data)
    })
    .catch(error => console.log(error))
  }

  return (
    <>
      <main>
        <Nav />
        <Routes>
          {!currentUser ? (
            <Route path="/" element={<p>Loading...</p>} />
          ) : (
            <Route path="/" element={<CreateAccountForm  createNewUser={createNewUser}/>} />
          )}
          <Route path="/dashboard" element={<Profile currentUser={currentUser} />}/>
          <Route path="/search" element={<SearchPage currentUser={currentUser} />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
