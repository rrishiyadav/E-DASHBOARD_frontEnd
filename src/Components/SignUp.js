import React, { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";
// import { json } from "react-router-dom";
export default function SignUp(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState(""); 
    const navigate = useNavigate();

    const collectData = async()=>{
         
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'content-Type':'application/json'
            }
        })
    

       
        const ree = await result.json()
        console.log(ree);
        navigate('/')
        localStorage.setItem("user",JSON.stringify(ree.result));
        localStorage.setItem("token",JSON.stringify(ree.auth))
    }


useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
}) 
    return(
        <div className="register" >
            <h3>Register Page</h3>
            <input className="inputBox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)}
             placeholder="Enter Name"/>
            <input className="inputBox" type="email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
             placeholder="Enter email"/>
            <input className="inputBox" type="password"
            value={password} onChange={(e)=>setPassword(e.target.value)}
             placeholder="Enter password"/>
            <button onClick={collectData} className="appButton">Sign Up</button>
        </div>
    )
}