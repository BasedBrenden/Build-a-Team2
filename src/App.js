import PokeView from './components/PokeView';
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
        // ...
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
            console.log(newTeam);
  
        })
        .catch((error) =>console.log(error))
      } else {
        // User is signed out
        // ...
        setUserId('no')
        setPremadeTeam([])
      }
    });

    
  }
  
  const updateSearch = async () =>{
    let inputSearch = document.querySelector('#input').value
    const updateError = document.querySelector('.ErrorMessage')

    try{
      const test2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputSearch.toLowerCase());
      const newTest2 = await test2.json();
      updateError.innerHTML = ' '
      
      setresult([newTest2])
      let searchUpdate = document.querySelector('#input')
      searchUpdate.value = ''
      return newTest2;
    }
    catch(error){
      updateError.innerHTML = 'Enter a valid or new pokemon name'
      console.log(error)
      return error
    }
  }


  return (
    <div className="App">
      <div>
        <Navbar/>
      </div>
      <h1> Apollo is my most favorite dog! Use this app to help you build your own pokemon team! </h1>
      <div className="Search">
        <input id='input' type="text" placeholder="begin searching for pokemon!"></input>
        <button type='button' onClick = {updateSearch}>Search!</button>
        <h1 className="ErrorMessage"> </h1>
      </div>

      <div className="PokeView-Container">
        {result.map((pokemon) =>
        <PokeView key={pokemon.id}
        id={pokemon.id}
        namei={pokemon.name}
        image={pokemon.sprites.front_default}
        type1={pokemon.types[0].type.name}
        userId = {userId}
        teamSize = {premadeTeam.length}
        updateTeamFunc = {renderTeam}
         />
        )}
      </div>

      <div className="TeamView-Container">

        <TeamView fullTeam={premadeTeam}
        updateTeamFunc={renderTeam}
        userId = {userId}/>
      </div>

    </div>
  );
}

export default App;
