import React from "react";
import { useNavigate } from "react-router-dom";
import './SignIn-Up.css';
import { auth, createUserWithEmailAndPassword } from "../../../firebase";

const SignUpForm = () =>{
    const navigate = useNavigate();
    const createNewDbUser = (user)=>{
        fetch('https://batbackend.herokuapp.com/sign-up',{
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(
            {username1: user, 
            trainerName: document.querySelector("#trainerName").value,
            trainerID: Math.floor(Math.random()* 99999)}),
        })
        .then((response) => {console.log(response)})
        .catch((error) => alert(error))
    }

    const SignUp = () =>{

        createNewDbUser(document.querySelector("#username").value)

        createUserWithEmailAndPassword(auth, document.querySelector("#username").value,document.querySelector("#password").value)
        .then((userCredential) => {
            // Signed in 
            console.log(userCredential.user.uid)
            navigate("/Home")
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode +": " + errorMessage)
            document.querySelector("#error-field").innerHTML= "Please enter a valid email and password";
            // ..
        });

    }


    return(
        <div id="main-container">
            <div id="sign-container">
                <h1>Sign up</h1>
                <input type="text" id="username" placeholder="Enter email"></input>
                <input type="text" id="trainerName" placeholder="Enter your trainer name"></input>
                <input type="password" id="password" placeholder="Enter pasword"></input>
                <button type="button" onClick={()=>{SignUp()}}>Sign Up!</button>
                <span id="error-field"> </span>
            </div>
        </div>
    );

};

export default SignUpForm;