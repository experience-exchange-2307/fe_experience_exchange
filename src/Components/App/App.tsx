import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser, NewUserData, ServerError } from 'types';
import { getSingleUser, postNewUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';
import Dashboard from 'Components/Dashboard/Dashboard';
import Loading from 'Components/Loading/Loading';
import RedirectPage from 'Components/RedirectPage/RedirectPage';

// import { useNavigate } from "react-router-dom";

function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
const [serverError, setServerError] = useState<ServerError | string>("")
const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser)
    {
      getSingleUser(14).then((data) => {
        console.log("data", data.data);
        setCurrentUser(data.data);
      })
    } 
    else 
      {
        getSingleUser(currentUser.id).then((data) => {
          console.log("data", data.data);
          setCurrentUser(data.data);
        })
      } 
    // eslint-disable-next-line
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
    .then (() => {
      if (currentUser) {

        navigate(`/dashboard/${currentUser.id}`);
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
              <Route path="/" element={<Loading />} />
            ) : (
              <Route
                path="/"
                element={<CreateAccountForm createNewUser={createNewUser} />}
              />
              )}
            {currentUser && <Route path="/dashboard/:id" element={<Dashboard currentUser={currentUser} />} />}
            <Route path="/search" element={<SearchPage currentUser={currentUser} />} />
            <Route path="/redirect" element={<RedirectPage currentUser={currentUser}/>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;