import { useNavigate } from "react-router-dom"
import './Navbar.css'
import { auth, signOut } from '../../firebase'



const Navbar = () =>{
    const navigate = useNavigate();
    const signOutClick = () =>{

        signOut(auth).catch((error)=>{console.log(error)})
        navigate("/")
    }

    const toggleDropdown = () => {

        document.querySelector(".dropdown-content").classList.toggle("show");

    }

    
    
    

    window.onclick = function(event) {
        if (!event.target.matches('.material-symbols-outlined')) {
            if(document.querySelector(".dropdown-content") && document.querySelector(".dropdown-content").classList.contains("show"))
            document.querySelector(".dropdown-content").classList.toggle("show");
        }
      } 


    return(
        <div className="navbarDiv"> 
            <p onClick={()=>{navigate("/Home")}}>Build-a-Team!</p>
                <div className="logInDiv">
                 
                    <div className="dropdown">
                        <button onClick={()=>{toggleDropdown()}} className="accntBtn"><span className="material-symbols-outlined"> account_circle </span></button>
                            <div id="myDropdown" className="dropdown-content">
                                <button type="button" className="dropdown-acc" onClick={()=>{navigate("/account")}} disabled={true} >Account Settings</button>
                                <button type="button" className="dropdown-signout" onClick={()=>{ signOutClick()}}>Sign Out</button>
                            </div>
                    </div> 
                </div>
        </div>
    )
}

export default Navbar