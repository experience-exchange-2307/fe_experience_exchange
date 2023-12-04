import Profile from 'Components/Profile/Profile';
import './App.css';
import { useEffect, useState } from 'react';
import { CurrentUser } from 'types';
import { getSingleUser } from 'apiCalls';
import {Routes, Route} from "react-router-dom"
import Nav from 'Components/Nav/Nav';
import ErrorPage from 'Components/ErrorPage/ErrorPage';
import MeetingCards from 'Components/MeetingCards/MeetingCards';
import CreateAccountForm from 'Components/CreateAccountForm/CreateAccountForm';
import SearchPage from 'Components/SearchPage/SearchPage';
function App() {
const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);

const meetings = [
  {
    id: 23,
    type: "meeting",
    attributes: {
      partner_id: 2,
      date: "01-01-2023",
      start_time: "07:30",
      end_time: "08:30",
      is_host: "true",
      is_accepted: "true"
    }
  },
  {
    id: 27,
    type: "meeting",
    attributes: {
      partner_id: 3,
      date: "01-05-2023",
      start_time: "11:00",
      end_time: "11:30",
      is_host: "false",
      is_accepted: "false"
    }
  }
];
  // on load => Get user (entire object)
  useEffect(() => {
    getSingleUser().then((data) => {
      console.log("data", data.data);
      setCurrentUser(data.data);
    })
  }, [])
  return (
    <>
      <main>
        <Nav />
        <Routes>
          {!currentUser ? (
            <Route path="/" element={<p>Loading...</p>} />
          ) : (
            <Route path="/" element={<CreateAccountForm />} />
          )}
          <Route path="/dashboard" element={<Profile currentUser={currentUser} />}/>
          <Route path="/search" element={<SearchPage currentUser={currentUser} />}/>
          <Route path='/meetings' element={<MeetingCards meetings={meetings} />} />
      <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
