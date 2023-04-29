


const typeCompare=( pokeTypes) =>{

    let typeCompareArr = [[],[]];

    //0 =adv
    //1 = weak

    pokeTypes.forEach( (pokeType) =>{
        
        if(pokeType === "FIRE"){

            typeCompareArr[0].push("GRASS")
            typeCompareArr[0].push("ICE")
            typeCompareArr[0].push("BUG")
            typeCompareArr[0].push("STEEL")
    
            typeCompareArr[1].push("WATER")
            typeCompareArr[1].push("GROUND")
            typeCompareArr[1].push("ROCK")
        }else if(pokeType === "FLYING"){
            typeCompareArr[0].push("GRASS")
            typeCompareArr[0].push("FIGHTING")
            typeCompareArr[0].push("BUG")
    
            typeCompareArr[1].push("ROCK")
            typeCompareArr[1].push("ICE")
            typeCompareArr[1].push("ELECTRIC")
    
        }else if(pokeType === "STEEL"){
    
            typeCompareArr[0].push("ICE")
            typeCompareArr[0].push("FAIRY")
            typeCompareArr[0].push("ROCK")
    
            typeCompareArr[1].push("FIRE")
            typeCompareArr[1].push("FIGHTING")
            typeCompareArr[1].push("GROUND")
            
        }else if(pokeType === "WATER"){
            typeCompareArr[0].push("FIRE")
            typeCompareArr[0].push("GROUND")
            typeCompareArr[0].push("ROCK")
    
            typeCompareArr[1].push("GRASS")
            typeCompareArr[1].push("ELECTRIC")
        }else if(pokeType === "GRASS"){
            typeCompareArr[0].push("WATER")
            typeCompareArr[0].push("GROUND")
            typeCompareArr[0].push("ROCK")
    
            typeCompareArr[1].push("FIRE")
            typeCompareArr[1].push("ICE")
            typeCompareArr[1].push("POISON")
            typeCompareArr[1].push("FLYING")
            typeCompareArr[1].push("BUG")
    
        }else if(pokeType === "DARK"){
            typeCompareArr[0].push("PSYCHIC")
            typeCompareArr[0].push("GHOST")
            
            typeCompareArr[1].push("POISON")
            typeCompareArr[1].push("BUG")
            typeCompareArr[1].push("FAIRY")
    
    
        }else if(pokeType === "ELECTRIC"){
            typeCompareArr[0].push("WATER")
            typeCompareArr[0].push("FLYING")
    
            typeCompareArr[1].push("GROUND")
        }else if(pokeType === "BUG"){
    
            typeCompareArr[0].push("GRASS")
            typeCompareArr[0].push("PSYCHIC")
            typeCompareArr[0].push("DARK")
    
            typeCompareArr[1].push("FIRE")
            typeCompareArr[1].push("ROCK")
            typeCompareArr[1].push("FLYING")
            
        }else if(pokeType === "PSYCHIC"){
    
            typeCompareArr[0].push("FIGHTING")
            typeCompareArr[0].push("POISON")
    
            typeCompareArr[1].push("BUG")
            typeCompareArr[1].push("GHOST")
            typeCompareArr[1].push("DARK")
            
        }else if(pokeType === "ROCK"){
            typeCompareArr[0].push("FIRE")
            typeCompareArr[0].push("ICE")
            typeCompareArr[0].push("FLYING")
            typeCompareArr[0].push("BUG")
    
            typeCompareArr[1].push("WATER")
            typeCompareArr[1].push("GRASS")
            typeCompareArr[1].push("FIGHTING")
            typeCompareArr[1].push("GROUND")
            typeCompareArr[1].push("STEEL")
            
        }else if(pokeType === "GROUND"){
            typeCompareArr[0].push("ELECTRIC")
            typeCompareArr[0].push("FIRE")
            typeCompareArr[0].push("POISON")
            typeCompareArr[0].push("ROCK")
            typeCompareArr[0].push("STEEL")
    
            typeCompareArr[1].push("WATER")
            typeCompareArr[1].push("GRASS")
            typeCompareArr[1].push("ICE")
            
        }else if(pokeType === "FAIRY"){
            
            typeCompareArr[0].push("FIGHTING")
            typeCompareArr[0].push("DRAGON")
            typeCompareArr[0].push("DARK")
    
            typeCompareArr[1].push("STEEL")
            typeCompareArr[1].push("POISON")
    
        }else if(pokeType === "FIGHTING"){
    
            typeCompareArr[0].push("NORMAL")
            typeCompareArr[0].push("ICE")
            typeCompareArr[0].push("ROCK")
            typeCompareArr[0].push("DARK")
            typeCompareArr[0].push("STEEL")
            
            typeCompareArr[1].push("FLYING")
            typeCompareArr[1].push("PSYCHIC")
            typeCompareArr[1].push("FAIRY")
    
        }else if(pokeType === "GHOST"){
    
            typeCompareArr[0].push("PSYCHIC")
            typeCompareArr[0].push("GHOST")
    
            typeCompareArr[1].push("GHOST")
            typeCompareArr[1].push("DARK")
            
        }else if(pokeType === "ICE"){
            typeCompareArr[0].push("GRASS")
            typeCompareArr[0].push("GROUND")
            typeCompareArr[0].push("FLYING")
            typeCompareArr[0].push("DRAGON")
    
            typeCompareArr[1].push("FIRE")
            typeCompareArr[1].push("FIGHTING")
            typeCompareArr[1].push("ROCK")
            typeCompareArr[1].push("STEEL")
        }else if(pokeType === "NORMAL"){
            typeCompareArr[1].push("FIGHTING")
        }else if(pokeType === "POISON"){
    
            typeCompareArr[0].push("GRASS")
            typeCompareArr[0].push("FAIRY")
    
            typeCompareArr[1].push("GROUND")
            typeCompareArr[1].push("PSYCHIC")
            
        }else if(pokeType === "DRAGON"){
            typeCompareArr[0].push("DRAGON")

            typeCompareArr[1].push("ICE")
            typeCompareArr[1].push("DRAGON")
            typeCompareArr[1].push("FAIRY")
    
        }else{

        }
    })
    
    typeCompareArr[0] = [...new Set(typeCompareArr[0])]
    typeCompareArr[1] = [...new Set(typeCompareArr[1])]

    return typeCompareArr
}


const changeTypeColor = (item) =>{

    let currClasses = item.classList;
    if (currClasses["1"]){
        item.classList.remove(currClasses["1"])
    }
    
    item.classList.add(item.innerHTML)

}

const updateFields = async (selectedPokemon) =>{
    try{
      let foundAbilities = [selectedPokemon.abilities[0].ability.name]
      
      let effect = await fetch(selectedPokemon.abilities[0].ability.url)
        .then((response)=>{
         return response.json();
        }).then((data)=>{
            return data.effect_entries[1].short_effect;
        })
    
      foundAbilities.push(effect)
      if(selectedPokemon.abilities.length > 1){
        foundAbilities.push(selectedPokemon.abilities[1].ability.name)
        effect = await fetch(selectedPokemon.abilities[1].ability.url)
        .then((response)=>{
         return response.json();
        }).then((data)=>{
            return data.effect_entries[1].short_effect;
        })
        foundAbilities.push(effect)
      }else{
        foundAbilities.push('')
      }

      let foundTypes = [selectedPokemon.types[0].type.name.toUpperCase()];
      if(selectedPokemon.types.length > 1){
        foundTypes.push(selectedPokemon.types[1].type.name.toUpperCase())
      }else{
        foundTypes.push('')
      }

      const typeCompareTemp = typeCompare(foundTypes);
      let anim = "n/a"
      if(selectedPokemon.sprites.versions['generation-v']['black-white'].animated.front_default){
        anim = selectedPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
        console.log(anim)
    }

      
      const converted = {
        pokeName: selectedPokemon.name.toUpperCase(),
        pokeImage: selectedPokemon.sprites.front_default,
        pokeImageAnim: anim,
        pokeID: selectedPokemon.id,
        pokeAbility: foundAbilities[0].toUpperCase(), 
        pokeAbilityEffect: foundAbilities[1],
        pokeAbility2: foundAbilities[2].toUpperCase(), 
        pokeAbilityEffect2: foundAbilities[3],
        pokeType: foundTypes[0],
        pokeType2: foundTypes[1],
        pokeTypeCompare: {
            adv: typeCompareTemp[0],
            weak: typeCompareTemp[1],
        }
      }
      selectedPokemon = converted;
    }
    catch(error){
        console.log(error)
    }
  }


export {typeCompare, updateFields, changeTypeColor};