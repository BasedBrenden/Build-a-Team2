import { Link } from "react-router-dom"

const AccountPage =()=>{
    return(
        <div>
                <p>Welcome to the account page!</p>
                <Link to="/"><button type="button">Go Home</button></Link>
        </div>

    )
}

export default AccountPage