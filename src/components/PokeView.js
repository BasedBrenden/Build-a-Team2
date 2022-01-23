import React from 'react'
import './PokeView.css'

const PokeView = ({name, id, image, type1, fullmadeTeam, updateTeamFunc, error}) => {

    const addPokemonToTeam = () =>{
        const newPokemonInfo ={
            pokeName: name,
            pokeID: id,
            pokeImage: image,
            pokeType: type1
        }
        console.log('yep, this button works')
        localStorage.setItem(id, JSON.stringify(newPokemonInfo));
        updateTeamFunc()

        const resultCard = document.querySelector('.container');
        resultCard.innerHTML = ''

    }

    return (

        
        <div className='container'>
        
            <div className="top-header">
                <h1>{name}</h1>
                <button type='button' onClick={addPokemonToTeam}>+</button>
            </div>
        
            <img src={image} alt='wooo' className="poke-sprite"></img>

            
                <p>{type1}</p>
            
        </div>
    )

    
}


export default PokeView
