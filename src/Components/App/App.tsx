import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser, NewUserData, ServerError } from "types";
import { getSingleUser, postNewUser } from "apiCalls";
import { Routes, Route } from "react-router-dom";
import Nav from "Components/Nav/Nav";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import CreateAccountForm from "Components/CreateAccountForm/CreateAccountForm";
import SearchPage from "Components/SearchPage/SearchPage";
import Dashboard from "Components/Dashboard/Dashboard";
import Loading from "Components/Loading/Loading";
import { useParams } from "react-router-dom";

function App() {


  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined
  );
  const [serverError, setServerError] = useState<ServerError | string>("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const {id } = useParams()
  // const userId = id ? parseInt(id) : undefined


  useEffect(() => {
    if(id) {
      console.log("make it here?")
      getSingleUser(Number(id))
      .then((data) => {
        console.log("data from params", data.data)
      setCurrentUser(data.data)
      })
    .catch(error => console.log(error)) 
    .finally(() => setLoading(false));
    }
  }, [id]);



  

  const createNewUser = (newUserData: NewUserData) => {
    postNewUser(newUserData)
      .then((data) => {
        if (data.error) {
          throw new Error(`${data.error}`);
        } else {
          console.log("POSTED user", data.data);
          setCurrentUser(data.data);
        }
      })
      .then(() => {
        if (currentUser) {
          navigate(`/dashboard/${currentUser.id}`);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setServerError(error);
      });
  };

  const loginDemoUser = () => {

    getSingleUser(14)
      .then((data) => {
        if (data.error) {
          throw new Error(`${data.error}`);
        } else {
          console.log("GET 14", data.data)
          setCurrentUser(data.data);
          navigate(`/dashboard/${data.data.id}`);
        }
      })
      .then(() => {
        console.log("currentUser", currentUser)
        if (currentUser) {
    
        }
      })
      .catch((error) => {
        console.log("error", error);
        setServerError(error);
      });
  };


  return (
    <>
      <main>
        {currentUser && <Nav currentUser={currentUser} />}
          <Routes>
            {!currentUser ? (
              <Route
                path='/'
                element={
                  <CreateAccountForm
                    createNewUser={createNewUser}
                    loginDemoUser={loginDemoUser}
                  />
                }
              />
            ) : (
              <Route
                path='/dashboard/:id'
                element={<Dashboard currentUser={currentUser} />}
              />
            )}
            <Route
              path='/search'
              element={
                <SearchPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            {/* <Route path='*' element={<ErrorPage />} /> */}
          </Routes>

      </main>
    </>
  );
}

export default App;

// {!currentUser ? (
//   <Route path='/' element={<Loading />} />
