import React from 'react'
import { useState, useEffect } from 'react'
import './TeamView.css'



const TeamView = ({fullTeam, updateTeamFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    const updateError = document.querySelector('.errorMessage');

    const changeTypeColor = (item) =>{
        

            if(item.innerHTML === "FIRE"){
                item.style.backgroundColor = "Orange";
            }else if(item.innerHTML === "FLYING"){
                item.style.backgroundColor = "#55bec2";
            }else if(item.innerHTML === "STEEL"){
                item.style.backgroundColor = "#88888a";
            }else if(item.innerHTML === "WATER"){
                item.style.backgroundColor = "#0909e3";
            }else if(item.innerHTML === "GRASS"){
                item.style.backgroundColor = "#049413";
            }else if(item.innerHTML === "DARK"){
                item.style.backgroundColor = "#010801";
            }else if(item.innerHTML === "ELECTRIC"){
                item.style.backgroundColor = "#bdb000";
            }else if(item.innerHTML === "BUG"){
                item.style.backgroundColor = "#a9b820";
            }else if(item.innerHTML === "PSYCHIC"){
                item.style.backgroundColor = "#f85888";
            }else if(item.innerHTML === "ROCK"){
                item.style.backgroundColor = "#b8a038";
            }else if(item.innerHTML === "GROUND"){
                item.style.backgroundColor = "#927d44";
            }else if(item.innerHTML === "FAIRY"){
                item.style.backgroundColor = "#9b6470";
            }else if(item.innerHTML === "FIGHTING"){
                item.style.backgroundColor = "#c03028";
            }else if(item.innerHTML === "GHOST"){
                item.style.backgroundColor = "#705898";
            }else if(item.innerHTML === "ICE"){
                item.style.backgroundColor = "#638d8d";
            }else if(item.innerHTML === "NORMAL"){
                item.style.backgroundColor = "#6d6d4e";
            }else if(item.innerHTML === "POISON"){
                item.style.backgroundColor = "#682a68";
            }else if(item.innerHTML === "DRAGON"){
                item.style.backgroundColor = "#7238f8";
            }else{
                return;
            }

    }

    useEffect(() => {
        if(document.querySelector(".testClass")){
            const typeSelected = document.querySelector(".testClass");
            changeTypeColor(typeSelected)
        }
        if(document.querySelector(".testClass2")){
            const typeSelected2 = document.querySelector(".testClass2");
            changeTypeColor(typeSelected2)
        }
    }, [focusedPokemon])
    

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
            pokeName: newTest2.name.toUpperCase(),
            pokeImage: newTest2.sprites.front_default,
            pokeID: newTest2.id,
            pokeAbility: foundAbilities[0].toUpperCase(), 
            pokeAbilityEffect: foundAbilities[1],
            pokeAbility2: foundAbilities[2].toUpperCase(), 
            pokeAbilityEffect2: foundAbilities[3],
            pokeType: foundTypes[0].toUpperCase(),
            pokeType2: foundTypes[1].toUpperCase(),
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
      
            <div className="info">
                {(focusedPokemon === '') ? <span></span>:
                 <div className="infoContainer">
                    <div className="infoViewCard">
                        <p> {focusedPokemon.pokeName}</p>
                        <img src={focusedPokemon.pokeImage} className="info-image" alt="woooo"></img>
                        <button type='button' onClick={() =>{addPokemonToTeam()}}>+</button>
                    </div>
                    <div id="infoStats">
                        <div className="statTitle">
                            <p>Dex No.:</p>
                            <p className = "statTitleType">Type:</p>
                            <p>OT:</p>
                            <p>OT ID:</p>
                            <p>Advantage: </p>
                            <p>Weakness: </p>
                        </div>
                        <div className="statContent">

                            <p>{focusedPokemon.pokeID}</p>
                            <p>
                            <div className="typeContainer">
                            <span className ="testClass">{focusedPokemon.pokeType}</span>
                            {(focusedPokemon.pokeType2 === '') ?<span></span>: <span className ="testClass2">{focusedPokemon.pokeType2}</span>}
                            </div>
                            </p>
                            <p>Brenden</p>
                            <p> 1776 </p>
                            <p>n/a</p>
                            <p>n/a</p>
                        </div>
                        
                        
                    </div>
                  
                    <div className = "infoAbility">
                        <h2>Abilities</h2>
                            <div className="abilityTitle">
                                <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(focusedPokemon.pokeAbilityEffect)}>{focusedPokemon.pokeAbility}</button>
                                {(focusedPokemon.pokeAbility2 === '') ?<span></span>:
                                <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(focusedPokemon.pokeAbilityEffect2)}>{focusedPokemon.pokeAbility2}</button>}
                            </div>
                            <div id="abilityDescription">
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
