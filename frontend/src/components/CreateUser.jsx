import { createUser } from "../api";
import { useState } from "react";
import React from 'react'

const CreateUser = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })
    function handleChange(e){
        setUser({...user, [e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        let response = await createUser(user);
        if(response.status!==200){
            alert("Account Couldn't be created!")
        }
        console.log(response)
    }

    
  return (
    <form action="" onSubmit={handleSubmit}>
        <input type="text" required name="name" maxLength={20} onChange={handleChange} placeholder="Enter Name"/>
        <input type="email" required name="email" maxLength={40} onChange={handleChange} placeholder="Enter Email"/>
        <input type="password" required name="password" maxLength={20} onChange={handleChange} placeholder="Enter Password"/>
        <button type="submit">Create Account</button>
    </form>
  )
}

export default CreateUser