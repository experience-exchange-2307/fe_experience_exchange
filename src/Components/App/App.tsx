import Profile from 'Components/Profile/Profile';
import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser, NewUserData, ServerError } from 'types';
import { getSingleUser, postNewUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';

function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
const [serverError, setServerError] = useState<ServerError | string>("")
  // on load => Get user (entire object)
  useEffect(() => {
    getSingleUser().then((data) => {
      console.log("data", data.data);
      setCurrentUser(data.data);
    })
  }, [])

  const createNewUser = (newUserData: NewUserData) => {
    console.log("newUserData", newUserData)
    postNewUser(newUserData)
    .then(data => {
      if(data.error) {
        throw new Error(`${data.error}`)
      } else {
        console.log("posted user", data)
        setCurrentUser(data.data)
      }
    })
    .catch(error => {
      console.log(error)
      setServerError(error)
    })
  }

  return (
    <>
      <main>
        <Nav />
        {serverError ? (
          <ErrorPage />
        ) : (
          <Routes>
            {!currentUser ? (
              <Route path="/" element={<p>Loading...</p>} />
            ) : (
              <Route
                path="/"
                element={<CreateAccountForm createNewUser={createNewUser} />}
              />
            )}
            <Route path="/dashboard" element={<Profile currentUser={currentUser} />} />
            <Route path="/search" element={<SearchPage currentUser={currentUser} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
