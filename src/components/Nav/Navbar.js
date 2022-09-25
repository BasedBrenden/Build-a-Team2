import LogIn from "./LogIn/LogIn"
import { useState, useEffect } from "react"
import './Navbar.css'
import { auth, signOut , onAuthStateChanged} from '../../firebase'



const Navbar = () =>{
    const [loggedIn, setLoggedIn] = useState(false)

    const signOutClick = () =>{

        signOut(auth).then(()=>{setLoggedIn(false)}).catch((error)=>{console.log(error)})

    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if (user){
                setLoggedIn(true)
            } 
        })
    }, [])


    return(
        <div className="navbarDiv"> 
            <p>Build-a-Team!</p>
            <div className="logInDiv">
                <div>{(loggedIn) ?  <button type="button" onClick={()=>{ signOutClick()}}>sign out</button> : <LogIn/>  } </div>
                
            </div>
        </div>
    )
}

export default Navbar