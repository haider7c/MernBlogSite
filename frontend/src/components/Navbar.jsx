import React from 'react'
import { Link } from 'react-router-dom'
import { pageData } from './pageData'

const Navbar = () => {
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
  </div>
  )
}

export default Navbar