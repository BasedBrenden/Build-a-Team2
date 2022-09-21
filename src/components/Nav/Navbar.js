import LogIn from "./LogIn/LogIn"
import './Navbar.css'



const Navbar = () =>{

    return(
        <div className="navbarDiv"> 
            <p>Build-a-Team!</p>
            <div className="logInDiv">
                <LogIn/>
            </div>
        </div>
    )
}

export default Navbar