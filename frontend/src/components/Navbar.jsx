import React from 'react'
import { Link } from 'react-router-dom'
import { pageData } from './pageData'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  function handleLogOut (){
    sessionStorage.removeItem("User")
    navigate("/")
  }
  return (
  <div className='navbar'>
      {
        pageData.map((page)=>{
            return(
                <Link to={page.path} className='navItem'>
                    <button>{page.name}</button>
                </Link>
            )
        })
    }
    <button onClick={handleLogOut}>Log Out</button>
  </div>
  )
}

export default Navbar