/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import {  auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./componentsStyling/SignIn-Up.css"

const LogInForm = () =>{
    const navigate = useNavigate();
    const LogInFunc = () =>{
        const userInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        signInWithEmailAndPassword(auth, userInfo.username, userInfo.password)
        .catch(() => {
            document.getElementById("errorField").innerHTML= "Please enter a valid email and password";
        });
    }

    const featureNotAvail =() =>{
        document.getElementById("errorField").innerHTML= "Feature not available atm :( sorry.";
    }

    return(
        <div id="mainContainer">
            <div id="signContainer">
                <h1>Sign in</h1>
                <input type="text" id="username" placeholder="Enter email"></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <span id="errorField"></span>
                <button type="button" id="logInBtn" onClick={()=>{LogInFunc()}}>Log In</button>
                <div id="signInLink">
                    <a onClick={()=>{featureNotAvail()}}>Forgot Password?</a>
                </div>
                <hr></hr>
                <button type="button" id="createBtn" onClick={()=>{navigate("/sign-up")}}>Create an account</button>
            </div>
        </div>
    )
}

export default LogInForm