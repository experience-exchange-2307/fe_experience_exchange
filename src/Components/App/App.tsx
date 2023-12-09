import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrentUser, NewUserData, ServerError } from "types";
import { getSingleUser, postNewUser } from "apiCalls";
import { Routes, Route } from "react-router-dom";
import Nav from "Components/Nav/Nav";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import CreateAccountForm from "Components/CreateAccountForm/CreateAccountForm";
import SearchPage from "Components/SearchPage/SearchPage";
import Dashboard from "Components/Dashboard/Dashboard";
import Loading from "Components/Loading/Loading";

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined
  );
  const [serverError, setServerError] = useState<ServerError | string>("");
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      getSingleUser(14).then((data) => {
        console.log("data", data.data);
        setCurrentUser(data.data);
      });
    } else {
      getSingleUser(currentUser.id).then((data) => {
        console.log("data", data.data);
        setCurrentUser(data.data);
      });
    }

    // eslint-disable-next-line
  }, []);

  const createNewUser = (newUserData: NewUserData) => {
    console.log("newUserData", newUserData);
    postNewUser(newUserData)
      .then((data) => {
        if (data.error) {
          throw new Error(`${data.error}`);
        } else {
          console.log("posted user", data);
          setCurrentUser(data.data);
        }
      })
      .then(() => {
        if (currentUser) {
          navigate(`/dashboard/${currentUser.id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(error);
      });
  };

  return (
    <>
      <main>
        {location.pathname !== "/" && currentUser && <Nav currentUser={currentUser} />}
        {serverError && (
          <ErrorPage />
        )}
        {!currentUser ? (<Loading/>) : (
          <Routes>
            {!currentUser ? (
              <Route path='/' element={<Loading />} />
            ) : (
              <Route
                path='/'
                element={<CreateAccountForm createNewUser={createNewUser} />}
              />
            )}
            {currentUser && (
              <Route
                path='/dashboard/:id'
                element={<Dashboard currentUser={currentUser} />}
              />
            )}
            <Route
              path='/search'
              element={<SearchPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
