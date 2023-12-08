import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser, NewUserData, ServerError } from 'types';
import { getSingleUser, postNewUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';
import Dashboard from 'Components/Dashboard/Dashboard';
import { useNavigate } from "react-router-dom";

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
        // navigate = useNavigate()
        
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
        {currentUser && <Nav currentUser={currentUser} />}
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
            {currentUser && <Route path="/dashboard/:id" element={<Dashboard currentUser={currentUser} />} />}
            <Route path="/search" element={<SearchPage currentUser={currentUser} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
