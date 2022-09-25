import React from 'react'
import { useState } from 'react'
import './TeamView.css'

/*Need to do

 -Change onClick function to make a fetch request to destroy the pokemon from team
*/


const TeamView = ({fullTeam, updateTeamFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('')



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

    }


    return (
        <div className="teamview-container">


            <div id="info">
                {(focusedPokemon === '') ? <span></span>:
                 <div>
                    <p> {focusedPokemon.pokeName}</p>
                    <img src={focusedPokemon.pokeImage} className="Info-img" alt="woooo"></img>
                    
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
