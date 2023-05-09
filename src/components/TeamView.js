import React from 'react'
import { updateSearch} from '../Utils'
import { useState} from 'react'
import './componentsStyling/TeamView.css'
import './componentsStyling/TypeStyles.css'
import InfoCard from './InfoCard'

const TeamView = ({fullTeam, updateTeamFunc, userId, trainerStats}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    
    
    const removePokemon = (pokeId) =>{
        fetch('https://batbackend.herokuapp.com/deletePoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({id: pokeId, Username: userId}),
        })
        .then((response)=>{
            updateTeamFunc();
            setFocusedPokemon('');
        })
        .catch((error) => console.log(error))
    }
    
    const updateFocused = (poke)=>{
        setFocusedPokemon(poke)
        setFocusedAbility('')
        updateTeamFunc();
    }

    const addPokemonToTeam = () =>{
        const updateError = document.querySelector('.errorMessage');
        if(fullTeam.length === 6){
            updateError.innerHTML = "Current team is too large! Try removing a pokemon and trying again"
        }else{
            fetch('https://batbackend.herokuapp.com/addPoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: focusedPokemon.pokeID,
                pokeImage: focusedPokemon.pokeImage,
                pokeImageAnim: focusedPokemon.pokeImageAnim,
                pokeName: focusedPokemon.pokeName,
                pokeAbility: focusedPokemon.pokeAbility, 
                pokeAbilityEffect: focusedPokemon.pokeAbilityEffect,
                pokeAbility2: focusedPokemon.pokeAbility2, 
                pokeAbilityEffect2: focusedPokemon.pokeAbilityEffect2,
                pokeType: focusedPokemon.pokeType,
                pokeType2: focusedPokemon.pokeType2,
                pokeTypeCompare:{
                    adv: focusedPokemon.pokeTypeCompare.adv,
                    weak: focusedPokemon.pokeTypeCompare.weak,
                },
                Username: userId}) 
            })
            .then(()=>{updateTeamFunc(); setFocusedPokemon('')})
            .catch((error)=>{updateError.innerHTML = error})
        }
    }


    return (
        <div className="teamviewContainer">
            <div className="search2">
                <input id='input' type="text" placeholder="Try &quot;Absol&quot; or &quot;Piplup&quot;!"></input>
                <button type='button' id= "searchBtn"onClick={()=>{updateSearch(setFocusedPokemon);}}>Search!</button>
                <h1 className="errorMessage"> </h1>
            </div>
      
            <div className="info">
                {(focusedPokemon === '') ? <span></span>:
                    <InfoCard Pokemon={focusedPokemon} />
                }
            </div>
            <div id="team">
                {fullTeam.map((pokemon)=>
                    <div className='teamCardContainer' key= {pokemon.pokeName} onClick={() => {updateFocused(pokemon)}}>
                        <div className="teamCardHeader">
                            <p>{pokemon.pokeName}</p>
                            <div>
                                <button type='button' className="teamCardDelete" onClick={() => {removePokemon(pokemon.pokeID);}} value={pokemon.pokeID}>X</button>
                            </div>
                        </div>
                        <img src={pokemon.pokeImage} alt='wooo' className="pokeSprite"></img>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamView
