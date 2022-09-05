import React, { useState, useEffect } from 'react'
import {useSelector} from "react-redux"
import { loadUser } from '../../actions/userAction';
import store from '../../Store';
import UserOptions from './UserOptions';

const Navbar = (props) => {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  const [showMenu, setShowMenu] = useState(false)

  let menu
  if (showMenu) {
    menu = <div className="nav-links bg-[#f2f2f2] text-[#616161] absolute h-fit w-full md:static inset-0 top-16 p-5 space-y-5  ">
      <div className="links"><a className='link' href="/products">Products</a></div>
      <hr />
    </div>
  }

  return (
    <>
      <div className="navbar flex justify-between text-center items-center px-10 py-5"> {/* try changing justify-between */}
        <div className="hamburger md:hidden" onClick={() => { setShowMenu(!showMenu) }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {menu}
        </div>

        {/* Here goes the logo and name */}
        <div className='logo text-center text-lg flex md:order-first font-medium'>
          <a href="/">{props.name}</a>
        </div>

        {/* Links on the right og the logo and name */}
        <div className='nav-links absolute md:flex justify-start text-sm md:space-x-7 mx-40  -translate-x-96 md:-translate-x-0'>
          <a className="links" href="/products">Products</a>
        </div>

        {/* Here goes the other links which should be displayed on right at md */}
        <div className='nav-links flex space-x-5'>
          <a href="/search"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg></a>  
          <a href="/login">Login</a>
          {isAuthenticated && <UserOptions user={user} />}

        </div>
      </div>
    </>
  )
}

Navbar.defaultProps = {
  name: "Enter name here"
}

export default Navbar