import React from 'react'

import './TeamView.css'

/*Need to do

 -Change onClick function to make a fetch request to destroy the pokemon from team
*/


const TeamView = ({fullTeam, updateTeamFunc}) => {


    const removePokemon = (pokeId) =>{
        fetch('https://batbackend.herokuapp.com/apir/delete',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({id: pokeId}),
        })
        .then((response)=>{
            console.log(response)
            updateTeamFunc();
        })
        .catch((error) => console.log(error))

    }


    return (
        <div className="teamview-container">


            {fullTeam.map((pokemon)=>
                

                <div className='teamCard-container' key= {pokemon.pokeName}>
        
                <div className="teamCard-header">
                    <h1>{pokemon.pokeName}</h1>
                    <button type='button' className="teamCard-delete" onClick={() => {removePokemon(pokemon.pokeID);}} value={pokemon.pokeID}>X</button>
                </div>
            
                <img src={pokemon.pokeImage} alt='wooo' className="poke-sprite"></img>
    
                
                    <p>{pokemon.pokeType}</p>
                
            </div>
            )}
        </div>
    )
}

export default TeamView
