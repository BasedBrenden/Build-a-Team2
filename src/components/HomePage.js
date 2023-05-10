import {useState, useEffect} from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TeamView from './TeamView';
import Navbar from './Navbar'
import './componentsStyling/HomePage.css';

function HomePage() {

  const [premadeTeams, setPremadeTeams] = useState([])
  const [userId, setUserId] = useState('no');
  const navigate = useNavigate();
 
  useEffect(() => {
    renderTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const renderTeams = async() =>{
    const newTeams = []
    
      if(auth.currentUser){
        const uid = auth.currentUser.email;
        
        setUserId(uid)
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: uid}),
        })
        .then((response)=> { return response.json()})
        .then((data) => {
          if(data[0].Teams){
            console.log(data[0].Teams);
            for (let i = 0; i < data[0].Teams.length; ++i ) {
            newTeams.push(data[0].Teams[i]);
            }
            setPremadeTeams([...newTeams]) 
          }
          
        })
        .catch((error) =>console.log(error))
      }else{
        navigate("/")
      }
        
    };
  

  return (
    <div className="App">
      <div>
        <Navbar/>
      </div>
      <h1> Welcome Back! </h1>
      <div className="TeamViewContainer">
        <TeamView 
          fullTeam={premadeTeams}
          updateTeamsFunc={renderTeams}
          userId = {userId}
        />
      </div>
      <div className="footer">
        <span>Created by Brenden Thomas. Pokémon and Pokémon character names are trademarks of Nintendo.</span>
      </div>
    </div>
  );
}

export default HomePage;
