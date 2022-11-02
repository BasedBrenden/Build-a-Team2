import React from 'react'
import { typeCompare, updateSearch, changeTypeColor } from '../Utils'
import { useState, useEffect, useRef} from 'react'
import './TeamView.css'
import './TypeStyles.css'



const TeamView = ({fullTeam, updateTeamFunc, userId, trainerStats}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    const [focusedTypes, setFocusedTypes] = useState('');

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
            console.log(tempElem.innerHTML)
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
        let currTypes =[]
        if(poke.pokeType){
            if(poke.pokeType2){
                currTypes = [poke.pokeType, poke.pokeType2]
            }
            else{
                currTypes = [poke.pokeType]
            }
            setFocusedTypes(typeCompare(currTypes))
        }
        setFocusedAbility('')
        updateTeamFunc();
    }

    const addPokemonToTeam = () =>{
        const updateError = document.querySelector('.errorMessage');
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




    return (
        <div className="teamview-container">
            <div className="search2">
                <input id='input' type="text" placeholder="Search for Pokemon"></input>
                <button type='button' onClick={()=>{updateSearch(setFocusedPokemon);}}>Search!</button>
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
                            <div id="infoStatsName">
                                <p>Dex No.:</p>
                                <p className ="pTest2">{focusedPokemon.pokeID}</p>
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
                                { (focusedTypes === '') ?<span></span>: focusedTypes[0].map((type) =>
                                
                                        <p className = "testClass3">{type}</p>
                                    
                                )}
                                </div>
                            </div>
                            <div id="infoStatsWeak">
                                <p>Weakness: </p>
                                <div className="pTest">
                                { (focusedTypes === '') ?<span></span>: focusedTypes[1].map((type) =>
                                
                                        <p className = "testClass3">{type}</p>
                                    
                                )}
                                </div>
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
