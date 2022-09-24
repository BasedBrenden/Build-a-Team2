import React from 'react'
import './PokeView.css'

const PokeView = ({namei, id, image, type1, userId, updateTeamFunc, teamSize}) => {

    const addPokemonToTeam = () =>{

        console.log('yep, this button works');
        //Fetch request to update current team roster with a new pokemon to the end
        if(teamSize === 6){

            alert("Current team is too large! Try removing a pokemon and trying again")

        }else{
            fetch('https://batbackend.herokuapp.com/addPoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: id,
                pokeImage: image,
                pokeName: namei,
                pokeNamew: namei,
                Username: userId}) 
            })
            .then(()=>{updateTeamFunc()})
            .then(()=>{
                const resultCard = document.querySelector('.container');
                resultCard.innerHTML = ''})
            .catch((error)=>{alert(error)})

        }
    }

    return (

        
        <div className='container'>
        
            <div className="top-header">
                <h1>{namei}</h1>
                <button type='button' onClick={() =>{addPokemonToTeam()}}>+</button>
            </div>
        
            <img src={image} alt='wooo' className="poke-sprite"></img>

            
                <p>{type1}</p>
            
        </div>
    )

    
}


export default PokeView
