import Navbar from "./Navbar"
import './componentsStyling/Safari.css'
import { useEffect, useState } from "react"

//hooks needed
// useEffect - to run immediately or when an encounter has ended
// useState - manage state of encounter 

const Safari = () =>{

    const [encounter, setEncounter] = useState()
    const [pokeStatus, setPokeStatus] = useState()
    const [itemInventory, setItemInventory] = useState({
        pokeBalls: 20,
        bait: 10
    })
    const [caughtPokemon, setCaughtPokemon] = useState([])
    useEffect(() => {
      
    startGame()
    console.log("this happened")
    }, [encounter])

    //FLOW
    //generate array of 50 random numbers
    //wait a random amount of seconds, 3-12
    //display pokemon
        //if run
            //clear safari view of pokemon, start over
        //if throw
            //animation, ball drops down on top, poke shrinks, ball glows up to 3 times for capture
            //if caught
                //add to PC
                //clear view, start over
            //if brokefree
                //display poke again

    const startGame = async() =>{
        const pokeNameH1 = document.querySelector('#pokeName')
        const pokeImg = document.querySelector('#pokeSprite')
        const promptP = document.querySelector('#prompt')

        let availPokemon = [0]
        for(let i=0; i < 50; i++){
            availPokemon.push(Math.floor(Math.random()*493))
        }
        
        const id = availPokemon[Math.floor(Math.random()*49)]
        pokeImg.classList.add("dot-flashing")
        pokeImg.src = " "
        pokeNameH1.innerHTML = "Finding new Safari Encounter..."

        const selectedPokemon = await (await fetch('https://pokeapi.co/api/v2/pokemon/'+ id)).json()
        const selectedPokemonStatus = {
           catchRate: 0.26,
           fleeChance: 0.10,
           angerPercentage: 0
        }
        setPokeStatus(selectedPokemonStatus)
        setTimeout(()=>{
            
            promptP.innerHTML = `${selectedPokemon.name[0].toUpperCase() + selectedPokemon.name.substring(1)} appeared!` 
            pokeImg.classList.remove("dot-flashing")
            pokeNameH1.innerHTML =  selectedPokemon.name.toUpperCase()
            pokeImg.src = selectedPokemon.sprites.versions['generation-v']['black-white'].animated.front_default

        }, Math.random()*9000)
    }

    const updatePrompt = (message, interval)=>{
        const promptP = document.querySelector('#prompt')
        setTimeout(()=>{promptP.innerHTML=message;},interval)
    }

    const throwPokeball = () =>{
        const promptP = document.querySelector('#prompt')
        promptP.innerHTML = "Go! Pokeball!"
        //execute pokeball throw animation

        let newPokeballCount = itemInventory.pokeBalls - 1
        
        if (newPokeballCount < 0){
            newPokeballCount = 0
            updatePrompt("You're all out of pokeballs!", 2000)
        }else{
            if ((Math.random()) < pokeStatus.catchRate ){
                updatePrompt("Got em!",6000)
                setTimeout(startGame, 9000)
                setCaughtPokemon([...caughtPokemon,document.querySelector('#pokeName').innerHTML])
            }else{
                updatePrompt("Darn, so close!",6000)
                if((Math.random()) < pokeStatus.fleeChance){
                    updatePrompt("The pokemon ran away...",9000)
                    setTimeout(startGame, 12000)
                }
            }
        }
        setItemInventory(inventory=>({...itemInventory, pokeBalls: newPokeballCount}))
        
       
        console.log(pokeStatus.catchRate, pokeStatus.fleeChance, pokeStatus.angerPercentage)
        console.log(caughtPokemon)


        
        
        
        
        updatePrompt("What would you like to do?",9000)
        //calculate chance of being caught
        //if caught, say so
        //if not, pokeballs down by one, flee chance up one
        
    }

    //should bait make pokemon easier to catch?

    const throwBait = () =>{

        //check if you have bait!
        const baitInventory = itemInventory.bait-1
        console.log({baitInventory})
        if(baitInventory < 0){
            updatePrompt("You don't have any bait!",1000)
        }else{

            //execute bait throw animation
            const promptP = document.querySelector('#prompt')
            promptP.innerHTML = `Threw Bait!`
            updatePrompt( "They ate the bait! Yum!", 3000)
            
            const newAngerPerc = pokeStatus.angerPercentage -5
            setPokeStatus(status =>({...status,angerPercentage: newAngerPerc}))
            setItemInventory(inventory=>({...inventory, bait: baitInventory}))
        }
        

        updatePrompt("What would you like to do?", 6000)
        console.log({pokeStatus})
    }

    const throwRock = () =>{
        //execute rock throw animation
        
        updatePrompt("Hurled Rock!",0)
        //angry poke animation
        updatePrompt("They did NOT like that...", 3000)
        
        
        
        //decrease poke chance of running away
        //increase anger
        const newAngerPerc = pokeStatus.angerPercentage +10
        const newFleeChance = pokeStatus.fleeChance + .10
        console.log({newAngerPerc, newFleeChance})
            //if anger too high, pokemon yells, you run away
        if ((newAngerPerc > 100) || ((Math.random()) < newFleeChance) ){
            const amountLost = Math.floor(Math.random()*10)
            if(Math.random()<.45){
                
                updatePrompt(`The pokemon yells,causing you to flee in panic. Dropped ${amountLost} Pokeballs in panicked state`, 6000)
                const newPokeballCount = itemInventory.pokeBalls-amountLost
                setItemInventory(item=>({...item, pokeBalls: newPokeballCount}))
            }else{
                updatePrompt(`The pokemon yells,causing you to flee in panic. Dropped ${amountLost} Bait in panicked state`, 6000)
                const newBaitCount = itemInventory.bait-amountLost
                setItemInventory(item=>({...item, bait: newBaitCount}))
            }
            
            setTimeout(startGame, 9000)
        }else{
            setPokeStatus(status =>({...status,angerPercentage: newAngerPerc, fleeChance: newFleeChance}))
            updatePrompt("What would you like to do?", 9000)
        }
        
         
    }



 
    

    return(
        <div className="safariContainer">
            <div className="nav">
               <Navbar/> 
            </div>

            <div className="mainContainer">
                <div className="safariView">
                    <h1 id="pokeName">Finding new Safari Encounter...</h1>
                    <img id="pokeSprite" src="" alt="   "></img>
                </div>
                <div className="optionsView">
                    <p id="prompt"></p>
                    <button type = "button" id="btnBall"onClick={()=>{throwPokeball()}}>Throw Pokeball x{itemInventory.pokeBalls}</button>
                    <button type = "button" id="btnBait"onClick={()=>{throwBait()}}>Throw Bait x{itemInventory.bait}</button>
                    <button type = "button" id="btnRock"onClick={()=>{throwRock()}}>Throw Rock</button>
                    <button type = "button" id="btnRun"onClick={()=>{startGame()}}>Run</button>
                </div>
            </div>
            

        </div>
    )

}

export default Safari