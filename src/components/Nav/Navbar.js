import LogIn from "./LogIn/LogIn"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './Navbar.css'
import { auth, signOut , onAuthStateChanged} from '../../firebase'



const Navbar = () =>{
    const [loggedIn, setLoggedIn] = useState(false)

    const signOutClick = () =>{

        signOut(auth).then(()=>{setLoggedIn(false)}).catch((error)=>{console.log(error)})

    }

    const toggleDropdown = () => {

        document.querySelector(".dropdown-content").classList.toggle("show");

    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if (user){
                setLoggedIn(true)
            } 
        })
    }, [])

    window.onclick = function(event) {
        if (!event.target.matches('.material-symbols-outlined')) {
            if(document.querySelector(".dropdown-content").classList.contains("show"))
            document.querySelector(".dropdown-content").classList.toggle("show");
        }
      } 


    return(
        <div className="navbarDiv"> 
            <p>Build-a-Team!</p>
            <div className="logInDiv">
                <div>{(loggedIn) ?  
                <div className="dropdown">
                    <button onClick={()=>{toggleDropdown()}} className="accntBtn"><span className="material-symbols-outlined"> account_circle </span></button>
                        <div id="myDropdown" className="dropdown-content">
                        <button type="button" className="dropdown-acc"><Link to="/account">Account Settings</Link></button>
                            <button type="button" className="dropdown-signout" onClick={()=>{ signOutClick()}}>Sign Out</button>
                        </div>
                </div> 
                :<LogIn/>} 
              </div>
                
            </div>
        </div>
    )
}

export default Navbar