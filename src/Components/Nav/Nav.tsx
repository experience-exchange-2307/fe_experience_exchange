import "./Nav.css"
import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <aside className='nav-wrapper'>
      <h1>Experience Exchange</h1>
      <nav className='nav-links-container'>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
        <NavLink to={"/search"}>Search</NavLink>
      </nav>
    </aside>
  )
}

export default Nav
