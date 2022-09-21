import {Link} from "react-router-dom";

const LogIn = () =>{
    return(
        <div>
            <Link to="/log-in"><button type="button">Log In</button></Link>
            <Link to="/sign-up"><button type="button">Sign up</button></Link>
        </div>
    )
}


export default LogIn