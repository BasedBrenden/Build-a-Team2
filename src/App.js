import './App.css';
import {useState, useEffect} from 'react'
import { auth, onAuthStateChanged } from './firebase';
import TeamView from './components/TeamView';
import Navbar from './components/Nav/Navbar';

function App() {

  const [result, setresult] = useState([])
  const [premadeTeam, setPremadeTeam] = useState([])
  const [userId, setUserId] = useState('no');

  useEffect(() => {
    renderTeam();
  }, [])
  
  const renderTeam = () =>{
    const newTeam = []
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //loggedIn = true;
        const uid = user.uid;
        setUserId(uid)
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: uid}),
        })
        .then((response)=> { return response.json()})
        .then((data) => {
          for (let i = 0; i < data[0].Team.length; ++i ) {
            newTeam.push(data[0].Team[i]);
            }
            setPremadeTeam([...newTeam])
            setresult([])
        })
        .catch((error) =>console.log(error))
      } else {
        // User is signed out
        setUserId('no')
        setPremadeTeam([])
      }
    });
  }

  return (
    <div className="App">
      <div>
        <Navbar/>
      </div>
      <h1> Use this app to help build your own pokemon team! </h1>
      <div className="TeamView-Container">
        <TeamView 
          searchResult = {result}
          fullTeam={premadeTeam}
          updateTeamFunc={renderTeam}
          userId = {userId}
        />
      </div>
    </div>
  );
}

export default App;
