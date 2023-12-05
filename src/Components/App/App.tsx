import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser } from 'types';
import { getSingleUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';
import Dashboard from 'Components/Dashboard/Dashboard';
function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    getSingleUser().then((data) => {
      console.log("data", data.data);
      setCurrentUser(data.data);
    })
  }, [])

  return (
    <>
      <main>
        {currentUser && <Nav currentUser={currentUser} />}
        <Routes>
          {!currentUser ? (
            <Route path="/" element={<p>Loading...</p>} />
          ) : (
            <Route path="/" element={<CreateAccountForm />} />
            )}
          {currentUser && <Route path="/dashboard/:id" element={<Dashboard currentUser={currentUser} />}/>}
          <Route path="/search" element={<SearchPage currentUser={currentUser} />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
