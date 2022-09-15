import React from 'react'
import './PokeView.css'

const PokeView = ({namei, id, image, type1, fullmadeTeam, updateTeamFunc, error}) => {

    const addPokemonToTeam = () =>{

        console.log('yep, this button works');
        //Fetch request to update current team roster with a new pokemon to the end
        fetch('https://batbackend.herokuapp.com/apir',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: id,
                pokeImage: image,
                pokeName: namei,
                pokeNamew: namei}),
        })
        .then((response)=> updateTeamFunc())
        .catch((error)=>{alert(error)})
        //localStorage.setItem(id, JSON.stringify(newPokemonInfo));
        //updateTeamFunc()

        

        const resultCard = document.querySelector('.container');
        resultCard.innerHTML = ''

    }

    return (

        
        <div className='container'>
        
            <div className="top-header">
                <h1>{namei}</h1>
                <button type='button' onClick={addPokemonToTeam}>+</button>
            </div>
        
            <img src={image} alt='wooo' className="poke-sprite"></img>

            
                <p>{type1}</p>
            
        </div>
    )

    
}


export default PokeView
