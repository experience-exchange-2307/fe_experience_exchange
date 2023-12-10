import "./App.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrentUser, NewUserData, ServerError } from "types";
import { postNewUser } from "apiCalls";
import { Routes, Route } from "react-router-dom";
import Nav from "Components/Nav/Nav";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import CreateAccountForm from "Components/CreateAccountForm/CreateAccountForm";
import SearchPage from "Components/SearchPage/SearchPage";
import Dashboard from "Components/Dashboard/Dashboard";
import Loading from "Components/Loading/Loading";

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: 14,
    type: "user",
    attributes: {
      first_name: "Ethan",
      last_name: "Bustamante",
      email: "Ethan@gmail.com",
      address: {
        street: "1234 Street",
        city: "Denver",
        state: "CO",
        zipcode: "12345",
      },
      about: "I am a also very good programmer",
      lat: 1.12,
      lon: 1.12,
      is_remote: true,
      skills: [
        {
          name: "felting",
          proficiency: 3,
        },
        {
          name: "felting",
          proficiency: 2,
        },
        {
          name: "napping",
          proficiency: 5,
        },
      ],
    },
  });
  const [serverError, setServerError] = useState<ServerError | string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const createNewUser = (newUserData: NewUserData) => {
    console.log("newUserData", newUserData);
    postNewUser(newUserData)
      .then((data) => {
        if (data && data.error) {
          throw new Error(`${data.error}`);
        } else if (data) {
          console.log("posted user", data);
          setCurrentUser(data.data);
          console.log("currUser", currentUser);
          navigate(`/dashboard/${data.data.id}`);
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
              <Route path="/" element={<Loading />} />
            ) : (
              <Route
                path="/"
                element={<CreateAccountForm createNewUser={createNewUser} />}
              />
            )}
            {currentUser && (
              <Route
                path="/dashboard/:id"
                element={<Dashboard currentUser={currentUser} setServerError={setServerError}/>}
              />
            )}
            <Route
              path="/search"
              element={
                <SearchPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setServerError={setServerError}
                />
              }
            />
            <Route
              path="/search/:query"
              element={
                <SearchPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setServerError={setServerError}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
