import { useState, useEffect} from 'react'
import { changeTypeColor } from '../Utils';
import './componentsStyling/InfoCard.css'

const InfoCard = ({Pokemon}) => {
    const [focusedAbility, setFocusedAbility] = useState('');
    const [typeAdvToggle, setTypeAdvToggle] = useState(false);

    const typeAdvWeak = () =>{
        if(document.querySelector(".testClass")){
            const typeSelected = document.querySelector(".testClass");
            changeTypeColor(typeSelected)
            if(document.querySelector(".testClass2")){
                const typeSelected2 = document.querySelector(".testClass2");
                changeTypeColor(typeSelected2)
            }
        }
        const allTypesOnPage = document.querySelectorAll(".types");
        for(let i=0; i < allTypesOnPage.length; i++){
            let tempElem = allTypesOnPage[i]
            changeTypeColor(tempElem)
        }

        //changing the background colors of the card
        if (Pokemon.pokeType2 === ''){
            document.querySelector(".infoCardContainer").style.background = "linear-gradient(180deg,"+ window.getComputedStyle(allTypesOnPage[0]).backgroundColor +", white)";
        }else{
            document.querySelector(".infoCardContainer").style.background = "linear-gradient(180deg,"+ window.getComputedStyle(allTypesOnPage[0]).backgroundColor +", "+ window.getComputedStyle(allTypesOnPage[1]).backgroundColor +")";
        }
    }

    const toggleTypeAdvWeak = () =>{
        setTypeAdvToggle(!typeAdvToggle);
    }

    useEffect(() => {
        typeAdvWeak();
    }, [Pokemon, typeAdvToggle])


    return(
        <div className="infoCardContainer">
            
                
                    <p className="pokeCardName">{Pokemon.pokeName}</p>
                    <p className="pokeCardId">#{Pokemon.pokeID}</p>
                
                <div className="pokeCardMainTypes">
                    <p className = "types">{Pokemon.pokeType}</p>
                    {(Pokemon.pokeType2 === '') ?<span></span>:
                        <p className = "types">{Pokemon.pokeType2}</p>}
                    
                </div>
                
                {(Pokemon.pokeImageAnim === "n/a") ? <img src={Pokemon.pokeImage} className="infoImage" alt="woooo"></img>
                        : <img src={Pokemon.pokeImageAnim} className="infoImage" alt="woooo"></img> }
                
            
            <div className="pokeCardTypesComp">
                
                {(typeAdvToggle) ? 
                    <div id="infoStatsAdv">
                        <p>Advantage: </p>
                        <div className="typesContainer">
                            {Pokemon.pokeTypeCompare.adv.map((type, index) =>
                                <p key={index} className = "types">{type}</p>
                            )}
                        </div>
                    </div> 
                    : 
                    <div id="infoStatsAdv">
                        <p>Weakness: </p>
                        <div className="typesContainer">
                            {Pokemon.pokeTypeCompare.weak.map((type, index) =>
                                <p key={index} className = "types">{type}</p>    
                            )}
                        </div>
                    </div>
                }
                
                {/*
                <div id="infoStatsWeak">
                    <p>Weakness: </p>
                    <div className="pTestFinal">
                        {Pokemon.pokeTypeCompare.weak.map((type, index) =>
                            <p key={index} className = "testClass3">{type}</p>    
                        )}
                    </div>
                </div>
                */}

                {(typeAdvToggle) ? <div>
                    <span className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> radio_button_checked </span>
                    <span className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> circle </span>
                    </div>
                    : <div>
                        <span className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> circle </span>
                        <span className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> radio_button_checked </span>
                    </div>
                }
            </div>
            
            <div id = "infoAbility">
                <h2>Abilities</h2>
                <div className="abilityTitle">
                    <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(Pokemon.pokeAbilityEffect)}>{Pokemon.pokeAbility}</button>
                    {(Pokemon.pokeAbility2 === '') ?<span></span>:
                        <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(Pokemon.pokeAbilityEffect2)}>{Pokemon.pokeAbility2}</button>}
                </div>
                <div id="abilityDescription">
                    <p>{focusedAbility}</p>
                </div>
            </div>
            
        </div>
    )

}

export default InfoCard;