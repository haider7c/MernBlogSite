import { verifyUser } from "../api";
import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate()
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
        if(response){
            sessionStorage.setItem("User",response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/home")

        }else{
            alert("Login Failed")
        }
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