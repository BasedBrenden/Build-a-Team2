import React from "react";
import { useNavigate } from "react-router-dom";
import './SignIn-Up.css'

import { auth, createUserWithEmailAndPassword } from "../../../firebase";


const SignUpForm = () =>{
    const navigate = useNavigate();
    const createNewDbUser = (user)=>{
        fetch('https://batbackend.herokuapp.com/sign-up',{
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({username1: user}),
        })
        .then((response) => {console.log(response)})
        .catch((error) => alert(error))
    }
    const SignUp = () =>{

        const userInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        createUserWithEmailAndPassword(auth, userInfo.username, userInfo.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log({user})
            createNewDbUser(user.uid)
        })
        .then(()=>{navigate(-1);})
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode +": " + errorMessage)
            document.getElementById("error-field").innerHTML= "Please enter a valid email and password";
            // ..
        });

    }


    return(
        <div id="main-container">
            <div id="sign-container">
                <h1>Sign up</h1>
                <input type="text" id="username" placeholder="Enter email"></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <button type="button" onClick={()=>{SignUp()}}>Sign Up!</button>
                <span id="error-field"> </span>
            </div>
        </div>
    );

};

export default SignUpForm;