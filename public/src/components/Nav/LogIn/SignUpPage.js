import React from "react";

const SignUpForm = () =>{

    const SignUp = () =>{
        const userInfo = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        /*https://batbackend.herokuapp.com
        http://localhost:3000/*/
        fetch('http://localhost:3000/sign-up',{
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({username1: document.getElementById("username").value,
        password1: document.getElementById("password").value}),
        })
        .then((response) => {console.log(response)})
        .catch((error) => alert(error))
        console.log(userInfo);

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