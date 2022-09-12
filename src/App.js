import PokeView from './components/PokeView';
import './App.css';
import {useState, useEffect} from 'react'
import TeamView from './components/TeamView';
import Navbar from './components/Nav/Navbar';

function App() {

  const [result, setresult] = useState([])
  const [premadeTeam, setPremadeTeam] = useState([])

  useEffect(() => {
    renderTeam();
  }, [])
  

  const renderTeam = () =>{
    const newTeam = []

    fetch('https://batbackend.herokuapp.com/api/test/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response)=>response.json())
    .then((data) => alert(data))
    .catch((error) =>prompt(error))


    for (let i = 0; i < localStorage.length; ++i ) {
      newTeam.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      
    }
    setPremadeTeam([...newTeam])
    setresult([])
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
      <h1> Use this app to create a web app that helps you build your own pokemon team! </h1>
      <div className="Search">
        <input id='input' type="text" placeholder="begin searching for pokemon!"></input>
        <button type='button' onClick = {updateSearch}>Search!</button>
        <h1 className="ErrorMessage"> </h1>
      </div>

      <div className="PokeView-Container">
        {result.map((pokemon) =>
        <PokeView key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
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
