import { Link, useNavigate } from "react-router-dom"
import Navbar from "./components/Nav/Navbar"
import { useEffect, useState } from "react"
import { auth, onAuthStateChanged } from './firebase';

const App = () =>{

    const [isLoggIn, setisLoggIn] = useState(false)
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/Home');
      };
      
    useEffect(()=>{
        onAuthStateChanged(auth,(user) =>{
            if(user){
                navigateToHome()
            }
        })
    })
    return(
        <div>
            <div>
                <Navbar/>
            </div>

            <h1>Welcome to Build-a-Team!</h1>
            <h2>Click the button below or sign in to get started!</h2>
            <button type="button"><Link to="/sign-up">Create an account!</Link></button>
        </div>
    )
}

export default App