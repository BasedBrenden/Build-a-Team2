import LogIn from "./LogIn/LogIn"
import { useState } from "react"
import './Navbar.css'
import { auth, signOut } from '../../firebase'



const Navbar = (userCred) =>{
    const [loggedIn, setLoggedIn] = useState(userCred)
    const signOutClick = () =>{

        signOut(auth).then(()=>{setLoggedIn('')}).catch((error)=>{console.log(error)})

    }
    return(
        <div className="navbarDiv"> 
            <p>Build-a-Team!</p>
            <div className="logInDiv">
                {(loggedIn !== '') ? <div> <button type="button" onClick={()=>{ signOutClick()}}>sign out</button></div> : <LogIn/> }
                
            </div>
        </div>
    )
}

export default Navbar