import "./App.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrentUser, NewUserData } from "types";
import { postNewUser } from "apiCalls";
import { Routes, Route } from "react-router-dom";
import Nav from "Components/Nav/Nav";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import CreateAccountForm from "Components/CreateAccountForm/CreateAccountForm";
import SearchPage from "Components/SearchPage/SearchPage";
import Dashboard from "Components/Dashboard/Dashboard";
import Loading from "Components/Loading/Loading";
// import ThemeSwitcher from "Components/ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "Contexts/ThemeContext";

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [serverError, setServerError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {isDarkMode} = useTheme()

  const createNewUser = (newUserData: NewUserData) => {
    console.log("newUserData", newUserData);
    postNewUser(newUserData)
      .then((data) => {
        if (data && data.error) {
          throw new Error(`${data.error}`);
        } else if (data) {
          console.log("posted user", data);
          setCurrentUser(data.data);
          navigate(`/dashboard/${data.data.id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(error as { status: number; message: string } | null);
      });
  };
  console.log('serverError', serverError)
  return (
    <>
      <main className={`${isDarkMode ? "light" : "dark"}`}>
        {/* <ThemeSwitcher /> */}
        {location.pathname !== "/" && <Nav currentUser={currentUser} />}
        {(serverError && !currentUser) &&  <ErrorPage serverError={serverError} />}
        {!currentUser && location.pathname === "/loading" ? (
          <Loading />
        ) : (
          <Routes>
            {!currentUser && (
              <Route
                path="/"
                element={
                  <CreateAccountForm
                    createNewUser={createNewUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
            )}
            {currentUser && (
              
              <Route
                path="/dashboard/:id"
                element={
                  <Dashboard
                    currentUser={currentUser}
                    errorFromServer={serverError}
                    setServerError={setServerError}
                  />
                }
              />
            )}
            <Route
                path="/"
                element={
                  <CreateAccountForm
                    createNewUser={createNewUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />
            <Route
              path="/search"
              element={<SearchPage currentUser={currentUser} />}
            />
            <Route
              path="/search/:query"
              element={<SearchPage currentUser={currentUser} />}
            />
            <Route path="*" element={<ErrorPage serverError={serverError} />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
