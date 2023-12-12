import { CurrentUser } from "types";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import logo from '../../images/logo3.png'
interface CurrentUserProps {
  currentUser: CurrentUser | null;
}

function Nav({ currentUser }: CurrentUserProps) {
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
   
  };

  return (
    <aside className='nav-wrapper'>
      <div className='logo-wrapper'>

      <img src={logo} alt='abstract weaving logo' className='nav-logo'></img>
      <div className='logo-text'>

      <h1 className='logo-text-h1'>Experience</h1>
      <h1 className='logo-text-h1'>Exchange</h1>
      </div>
      </div>
      <nav className='nav-links-container'>   
       <NavLink
          to={`/`}
          className='nav-bar-link'
          style={linkStyle}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>

          <p className='nav-bar-text'>Create Account</p>
        </NavLink>
        <NavLink
          to={`/dashboard/${currentUser?.id}`}
          className='nav-bar-link'
          style={linkStyle}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          <p className='nav-bar-text'>My Dashboard</p>
        </NavLink>
        <NavLink to={"/search"}   className='nav-bar-link'
          style={linkStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

          <p className='nav-bar-text'>

          New Search
          </p>
          </NavLink>
      </nav>
    </aside>
  );
}

export default Nav;
