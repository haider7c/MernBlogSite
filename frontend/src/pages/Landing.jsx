import React from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { useState } from "react";

const Landing = () => {
  const [view, setView] = useState(0);
  return (
    <div>
      {!view ? (
        <div>
          <Login /> 
          <button onClick={()=>setView(!view)}>Create New Account</button>
        </div>
      ) : (
       <div>
         <CreateUser />
         <button onClick={()=>setView(!view)}>Login</button>
       </div>
      )}
    </div>
  );
};

export default Landing;
