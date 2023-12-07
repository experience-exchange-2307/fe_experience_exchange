import { CurrentUser } from "types";
import "./Nav.css"
import { NavLink } from 'react-router-dom'

interface CurrentUserProps {
  currentUser: CurrentUser | undefined;
}

function Nav({currentUser}: CurrentUserProps) {
  return (
    <aside className='nav-wrapper'>
      <h1>Experience Exchange</h1>
      <nav className='nav-links-container'>
        <NavLink to={`/dashboard/${currentUser?.id}`}>My Dashboard</NavLink>
        <NavLink to={"/search"}>Search</NavLink>
      </nav>
    </aside>
  )
}

export default Nav
