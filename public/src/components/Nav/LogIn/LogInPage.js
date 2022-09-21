import React from "react"


const LogInForm = () =>{

    const LogInFunc = () =>{
            fetch('http://localhost:3000/log-in',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value
                })
            })
            .then((response)=> {return response.json()})
            .catch((error)=>{
                console.log(error)
            })

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