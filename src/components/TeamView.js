import React from 'react'
import { useState } from 'react'
import PokeView from './PokeView'
import './TeamView.css'


/*Need to do

 -put search bar in this component
 -when search finishes, set result to focused pokemon
*/


const TeamView = ({fullTeam, updateTeamFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    //const [searchResult, setSearchResult] = useState([])

    const addPokemonToTeam = () =>{

        console.log('yep, this button works');
        //Fetch request to update current team roster with a new pokemon to the end
        if(fullTeam.length === 6){

            alert("Current team is too large! Try removing a pokemon and trying again")

        }else{
            fetch('https://batbackend.herokuapp.com/addPoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: focusedPokemon.pokeID,
                pokeImage: focusedPokemon.pokeImage,
                pokeName: focusedPokemon.pokeName,
                Username: userId}) 
            })
            .then(()=>{updateTeamFunc(); setFocusedPokemon('')})
            .catch((error)=>{alert(error)})

        }
    }

    const removePokemon = (pokeId) =>{
        fetch('https://batbackend.herokuapp.com/deletePoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({id: pokeId, Username: userId}),
        })
        .then((response)=>{
            console.log(response)
            updateTeamFunc();
        })
        .catch((error) => console.log(error))

    }
    
    const updateFocused = (poke)=>{

        setFocusedPokemon(poke)
        updateTeamFunc();

    }

    const updateSearch = async () =>{
        let inputSearch = document.querySelector('#input').value
        const updateError = document.querySelector('.ErrorMessage')
    
        try{
          const test2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputSearch.toLowerCase());
          const newTest2 = await test2.json();
          updateError.innerHTML = ' '
          const converted = {
            pokeName: newTest2.name,
            pokeImage: newTest2.sprites.front_default,
            pokeID: newTest2.id

          }
          setFocusedPokemon(converted)
          let searchUpdate = document.querySelector('#input')
          searchUpdate.value = ''
          return newTest2;
        }
        catch(error){
          updateError.innerHTML = 'Enter a valid pokemon name'
          console.log(error)
          return error
        }
      }


    return (
        <div className="teamview-container">
            <div className="search2">
                <input id='input' type="text" placeholder="begin searching for pokemon!"></input>
                <button type='button' onClick={updateSearch}>Search!</button>
                <h1 className="ErrorMessage"> </h1>
            </div>
      

            <div id="info">
                {(focusedPokemon === '') ? <span></span>:
                 <div>
                    <p> {focusedPokemon.pokeName}</p>
                    <img src={focusedPokemon.pokeImage} className="Info-img" alt="woooo"></img>
                    <button type='button' onClick={() =>{addPokemonToTeam()}}>+</button>
                    
                </div>}
            </div>
            <div id="team">

            {fullTeam.map((pokemon)=>
                

                <div className='teamCard-container' key= {pokemon.pokeName} onClick={() => {updateFocused(pokemon)}}>
        
                <div className="teamCard-header">
                    <p>{pokemon.pokeName}</p>
                    <div>
                        <button type='button' className="teamCard-delete" onClick={() => {removePokemon(pokemon.pokeID);}} value={pokemon.pokeID}>X</button>
                    </div>
                </div>
            
                <img src={pokemon.pokeImage} alt='wooo' className="poke-sprite"></img>
                
            </div>
            )}

            </div>
    
        </div>
    )
}

export default TeamView
