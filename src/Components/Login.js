import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();


    const loginData=async()=>{
        console.log("email:",email,"pass:",password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log("result",result); 
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result));
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
        }
    }
    useEffect(()=>{
       const auth = localStorage.getItem('user');
       if(auth){
        navigate('/')
       }
    },[])

    return(
        <div className="login">
            <h3>Login Page</h3>
            <input className="inBox" type="email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter Email"/>

            <input className="inBox" type="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>

            <button onClick={loginData} className="loButton">Login</button>
            
        </div>
    )
}