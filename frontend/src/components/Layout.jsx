import React from 'react'
import Navbar from "./Navbar"
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
  let user = sessionStorage.getItem("User")
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  },[user])
  return (
    <div>
    <Navbar/>
    <Outlet />
    </div>
  )
}

export default Layout