import React from "react"
import {  auth, signInWithEmailAndPassword } from "../../../firebase";
import { useNavigate } from "react-router-dom";


const LogInForm = () =>{
    const navigate = useNavigate();
    const LogInFunc = () =>{
        const userInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        signInWithEmailAndPassword(auth, userInfo.username, userInfo.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log({user})
            // ...
            navigate(-1);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": "+ errorMessage)
        });

    }
    return(
        <div>
            <input type="text" id="username"></input>
            <input type="password" id="password"></input>
            <button type="button" onClick={()=>{LogInFunc()}}>Log In!</button>
        </div>
    )
}

export default LogInForm