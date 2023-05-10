import React from 'react'
import { updateSearch} from '../Utils'
import { useState, useEffect} from 'react'
import './componentsStyling/TeamView.css'
import './componentsStyling/TypeStyles.css'
import InfoCard from './InfoCard'

const TeamView = ({fullTeam, updateTeamFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    const [focusedTeam, setFocusedTeam] = useState();
    
    
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
                Username: userId,
                Team: "Team1Test"}) 
            })
            .then(()=>{updateTeamFunc(); setFocusedPokemon('')})
            .catch((error)=>{updateError.innerHTML = error})
        }
    }

    const toggleTeamDropdown = () =>{
        const teamDropdown = document.querySelector('.teamDropdownContent');
        if(teamDropdown.style.display === 'flex'){
            teamDropdown.style.display = 'none';
        }else{
            teamDropdown.style.display = 'flex';
        }
    }



    return (
        <div className="teamviewContainer">
            <div className="search2">
                <input id='input' type="text" placeholder="Try &quot;Absol&quot; or &quot;Piplup&quot;!"></input>
                <button type='button' id= "searchBtn"onClick={()=>{updateSearch(setFocusedPokemon);}}>Search!</button>
                <h1 className="errorMessage"> </h1>
            </div>

            
                
                <div className="teamDropdown">
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam('Team1Test')}}>Team 1</button>
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam('Team2Test')}}>Team 2</button>
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam('Team3Test')}}>Team 3</button>
                </div>
            
      
            <div className="info">
                {(focusedPokemon === '') ? <span></span>:
                    <div>
                        <InfoCard Pokemon={focusedPokemon} />
                        <button type="button" onClick={()=>{addPokemonToTeam()}}> add pokemon</button>
                    </div>
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
