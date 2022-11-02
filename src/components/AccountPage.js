import { Link } from "react-router-dom"
import Navbar from "./Nav/Navbar"

const AccountPage =()=>{
    return(
        <div>
            <div>
                <Navbar/>
            </div>
                <p>Welcome to the account page!</p>
                <Link to="/"><button type="button">Go Home</button></Link>
        </div>

    )
}

export default AccountPage