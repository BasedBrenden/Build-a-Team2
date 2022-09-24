import React from "react";
import { useNavigate } from "react-router-dom";

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
            console.log(errorCode + ": " + errorMessage)
            // ..
        });

    }


    return(
        <div>
            <input type="text" id="username"></input>
            <input type="password" id="password"></input>
            <button type="button" onClick={()=>{SignUp()}}>Sign Up!</button>
        </div>
    );

};

export default SignUpForm;