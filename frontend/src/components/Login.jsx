import { verifyUser } from "../api";
import { useState } from "react";
import React from 'react'

const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    function handleChange(e){
        setUser({...user, [e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        let response = await verifyUser(user);
        console.log(response)
    }

    
  return (
    <form action="" onSubmit={handleSubmit}>
        <input type="email" required name="email" maxLength={40} onChange={handleChange} placeholder="Enter Email"/>
        <input type="password" required name="password" maxLength={20} onChange={handleChange} placeholder="Enter Password"/>
        <button type="submit">Login</button>
    </form>
  )
}

export default Login