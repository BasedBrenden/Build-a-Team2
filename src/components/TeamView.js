import React from 'react'
import { useState } from 'react'
import './TeamView.css'



const TeamView = ({fullTeam, updateTeamFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    const updateError = document.querySelector('.errorMessage')

    const addPokemonToTeam = () =>{

        //Fetch request to update current team roster with a new pokemon to the end
        if(fullTeam.length === 6){
            updateError.innerHTML = "Current team is too large! Try removing a pokemon and trying again"
        }else{
            fetch('https://batbackend.herokuapp.com/addPoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: focusedPokemon.pokeID,
                pokeImage: focusedPokemon.pokeImage,
                pokeName: focusedPokemon.pokeName,
                pokeAbility: focusedPokemon.pokeAbility, 
                pokeAbilityEffect: focusedPokemon.pokeAbilityEffect,
                pokeAbility2: focusedPokemon.pokeAbility2, 
                pokeAbilityEffect2: focusedPokemon.pokeAbilityEffect2,
                pokeType: focusedPokemon.pokeType,
                pokeType2: focusedPokemon.pokeType2,
                Username: userId}) 
            })
            .then(()=>{updateTeamFunc(); setFocusedPokemon('')})
            .catch((error)=>{updateError.innerHTML = error})

        }
    }

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

    const updateSearch = async () =>{
        const inputSearch = document.querySelector('#input').value
        try{
          const test2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputSearch.toLowerCase());
          const newTest2 = await test2.json();
          updateError.innerHTML = ' '

          let foundAbilities = [newTest2.abilities[0].ability.name]
          
          let effect = await fetch(newTest2.abilities[0].ability.url)
            .then((response)=>{
             return response.json();
            }).then((data)=>{
                return data.effect_entries[1].short_effect;
            })
        
          foundAbilities.push(effect)
          if(newTest2.abilities.length > 1){
            foundAbilities.push(newTest2.abilities[1].ability.name)
            effect = await fetch(newTest2.abilities[1].ability.url)
            .then((response)=>{
             return response.json();
            }).then((data)=>{
                return data.effect_entries[1].short_effect;
            })
            foundAbilities.push(effect)
          }else{
            foundAbilities.push('')
          }

          let foundTypes = [newTest2.types[0].type.name];
          if(newTest2.types.length > 1){

            foundTypes.push(newTest2.types[1].type.name)
          }else{
            foundTypes.push('')
          }

          
          const converted = {
            pokeName: newTest2.name,
            pokeImage: newTest2.sprites.front_default,
            pokeID: newTest2.id,
            pokeAbility: foundAbilities[0], 
            pokeAbilityEffect: foundAbilities[1],
            pokeAbility2: foundAbilities[2], 
            pokeAbilityEffect2: foundAbilities[3],
            pokeType: foundTypes[0],
            pokeType2: foundTypes[1],
          }
          setFocusedPokemon(converted)
          let searchUpdate = document.querySelector('#input')
          searchUpdate.value = ''
        }
        catch(error){
            console.log(error)
          updateError.innerHTML = 'Enter a valid pokemon name'
        }
      }


    return (
        <div className="teamview-container">
            <div className="search2">
                <input id='input' type="text" placeholder="Search for Pokemon"></input>
                <button type='button' onClick={updateSearch}>Search!</button>
                <h1 className="errorMessage"> </h1>
            </div>
      
            <div id="info">
                {(focusedPokemon === '') ? <span></span>:
                 <div className="infoContainer">
                    <div className="infoViewCard">
                        <p> {focusedPokemon.pokeName}</p>
                        <img src={focusedPokemon.pokeImage} className="info-image" alt="woooo"></img>
                        <button type='button' onClick={() =>{addPokemonToTeam()}}>+</button>
                    </div>
                    <div className="infoStats">
                        <h2>ID:<span>{focusedPokemon.pokeID}</span></h2>
                        <div className="infoTypes">
                                <h2>Type: <span>{focusedPokemon.pokeType} {focusedPokemon.pokeType2}</span></h2>
                        </div>
                    </div>
                    <div>
                            
                    </div>
                    <div className = "infoAbility">
                        <h2>Abilitites</h2>
                            <div className="abilityTitle">
                                <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(focusedPokemon.pokeAbilityEffect)}>{focusedPokemon.pokeAbility}</button>
                                {(focusedPokemon.pokeAbility2 === '') ?<span></span>:
                                <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(focusedPokemon.pokeAbilityEffect2)}>{focusedPokemon.pokeAbility2}</button>}
                            </div>
                            <div>

                                <p>{focusedAbility}</p>
                                
                                
                            </div>
                        
                    </div>
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
