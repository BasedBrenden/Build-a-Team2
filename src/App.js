import { Link, useNavigate} from "react-router-dom"
import { auth, onAuthStateChanged } from "./firebase"
import { useEffect } from "react"
import LogInForm from "./components/Nav/LogIn/LogInPage"
import './StartPage.css'

const App = () =>{

    const navigate = useNavigate()

    useEffect(()=>{

        onAuthStateChanged(auth,(user)=>{
            if(auth.currentUser){
                navigate("/home");
            }else{
                navigate("/")
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

      
    
    return(
        <div className="startContainer">
            <div className="startWelcome">
                <h1>Welcome to Build-a-Team!</h1>
                <h2>Click the button below or sign in to get started!</h2>
                <button type="button"><Link to="/sign-up">Create an account!</Link></button>
            </div>
            

            <div className="startSignIn">
                <LogInForm/>
            </div>
        </div>
    )
}

export default App