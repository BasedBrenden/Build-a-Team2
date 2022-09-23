import PokeView from './components/PokeView';
import './App.css';
import {useState, useEffect} from 'react'
import TeamView from './components/TeamView';
import Navbar from './components/Nav/Navbar';


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDj04TlOHQPhjj87M_o3Egih04g5hAROVc",

  authDomain: "buildateambt.firebaseapp.com",

  databaseURL: "https://buildateambt-default-rtdb.firebaseio.com",

  projectId: "buildateambt",

  storageBucket: "buildateambt.appspot.com",

  messagingSenderId: "231750263107",

  appId: "1:231750263107:web:e20e2f15ba084655c04ff6",

  measurementId: "G-SSTG0YXNM4"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


function App() {

  const [result, setresult] = useState([])
  const [premadeTeam, setPremadeTeam] = useState([])

  useEffect(() => {
    renderTeam();
  }, [])
  

  const renderTeam = () =>{
    const newTeam = []

    fetch('https://batbackend.herokuapp.com/')
    .then((response)=> {return response.json()}
    )
    .then((response)=>{
    for (let i = 0; i < response.Team.length; ++i ) {
      newTeam.push(response.Team[i]);
    }
    setPremadeTeam([...newTeam])
    setresult([])
      console.log(newTeam);
    })
    .catch((error) =>prompt(error))
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
        <Navbar />
      </div>
      <h1> Pleeease? Live test! Use this app to help you build your own pokemon team! </h1>
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
        updateTeamFunc = {renderTeam}
         />
        )}
      </div>

      <div className="TeamView-Container">

        <TeamView fullTeam={premadeTeam}
        updateTeamFunc={renderTeam}/>
      </div>

    </div>
  );
}

export default App;
