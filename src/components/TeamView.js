import React from 'react'
import { updateSearch, changeTypeColor } from '../Utils'
import { useState, useEffect} from 'react'
import './componentsStyling/TeamView.css'
import './componentsStyling/TypeStyles.css'

const TeamView = ({fullTeam, updateTeamFunc, userId, trainerStats}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    
    const typeAdvWeak = () =>{
        if(document.querySelector(".testClass")){
            const typeSelected = document.querySelector(".testClass");
            changeTypeColor(typeSelected)
            if(document.querySelector(".testClass2")){
                const typeSelected2 = document.querySelector(".testClass2");
                changeTypeColor(typeSelected2)
            }
        }
        const allTypesOnPage = document.querySelectorAll(".testClass3");
        for(let i=0; i < allTypesOnPage.length; i++){
            let tempElem = allTypesOnPage[i]
            changeTypeColor(tempElem)
        }
    }

    useEffect(() => {
        typeAdvWeak();
    }, [focusedPokemon])
    
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
            <div className="teamDropDown">
                <div id="input">
                    <input className="currentTeam" type="text" placeholder="Hover to select a team!"></input>
                    <div className="teamDropDownContent">
                        {/*Needs to be a map/foreach that displays all of the teams saved.*/}
                        <p>Team 1</p>
                        <p>Team 2</p>
                        <p>Team 3</p>
                    </div>
                    <h1 className="errorMessage"> </h1>
                </div>
                
            </div>
      
            <div className="info">
                {(focusedPokemon === '') ? <span></span>:
                 <div className="infoContainer">
                    <div className="infoViewCard">
                        <p> {focusedPokemon.pokeName}</p>
                        {(focusedPokemon.pokeImageAnim === "n/a") ? <img src={focusedPokemon.pokeImage} className="infoImage" alt="woooo"></img>
                        : <img src={focusedPokemon.pokeImageAnim} className="infoImage" alt="woooo"></img> }
                        {/* will be th new remove pokemon button*/}
                        <button type='button' id="addPokeBtn" onClick={() => {removePokemon(focusedPokemon.pokeID);}} value={focusedPokemon.pokeID}>Remove Pokemon</button>
                    </div>
                    <div id="infoStats">
                            <div id="infoStatsName">
                                <p>Dex No.:</p>
                                <p className ="pTest2First">{focusedPokemon.pokeID}</p>
                            </div>
                            <div id="infoStatsType">
                                <p className = "statTitleType">Type:</p>
                                <div className="typeContainer">
                                    <span className ="testClass">{focusedPokemon.pokeType}</span>
                                    {(focusedPokemon.pokeType2 === '') ?<span></span>: <span className ="testClass2">{focusedPokemon.pokeType2}</span>}
                                </div>
                            </div>
                            <div id="infoStatsOT">
                                <p>OT:</p>
                                <p className ="pTest2">{trainerStats.trainerName}</p>
                            </div>
                            <div id="infoStatsOTID">
                                <p>OT ID:</p>
                                <p className = "pTest">{trainerStats.trainerID}</p>
                            </div>
                            <div id="infoStatsAdv">
                                <p>Advantage: </p>
                                <div className="pTest2">
                                { focusedPokemon.pokeTypeCompare.adv.map((type, index) =>
                                        <p key={index} className = "testClass3">{type}</p>
                                )}
                                </div>
                            </div>
                            <div id="infoStatsWeak">
                                <p>Weakness: </p>
                                <div className="pTestFinal">
                                { focusedPokemon.pokeTypeCompare.weak.map((type, index) =>
                                        <p key={index} className = "testClass3">{type}</p>    
                                )}
                                </div>
                            </div>   
                    </div>
                    <div id = "infoAbility">
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
                    <div className='teamCardContainer' key= {pokemon.pokeName} onClick={() => {updateFocused(pokemon)}}>
                        <div className="teamCardHeader">
                            <p>{pokemon.pokeName}</p>
                        </div>
                        <img src={pokemon.pokeImage} alt='wooo' className="pokeSprite"></img>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamView
