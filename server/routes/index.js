var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
var mongoose = require('mongoose');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const UserData = require('../models/documentSchema')
var router = express.Router();


/* GET home page. */

router.get('/', async(req,res, next) =>{
  const currentPosts = await UserData.findById("631fb302c065ac636b9c5f95", (err, data)=>{
    if(err) {return console.error(err)}
  }).clone();
  res.json(currentPosts)
})


router.post('/getTeam', async(req,res, next) =>{
  const username = req.body.userId
  const currentPostsaaa = await UserData.find({Username: username}, (err, data)=>{
    if(err) {return console.error(err)}
  }).clone();
  res.json(currentPostsaaa)
})


/* Post user sign-up/account creation*/
router.post("/sign-up", (req,res,next)=>{
  const user = new UserData({
    Username: req.body.username1,
    trainerName: req.body.trainerName,
    trainerID: req.body.trainerID
  }).save(err=>{
    if(err){
      return next(err);
    }})
  res.send("please?")
})



/* Post a new pokemon into the roster*/

router.post('/addPoke', async (req,res, next)=>{
  const newPokemonInfo ={
    pokeID: req.body.pokeID,
    pokeImage: req.body.pokeImage,
    pokeName: req.body.pokeName,
    pokeAbility: req.body.pokeAbility,
    pokeAbilityEffect: req.body.pokeAbilityEffect,
    pokeAbility2: req.body.pokeAbility2, 
    pokeAbilityEffect2: req.body.pokeAbilityEffect2,
    pokeType: req.body.pokeType,
    pokeType2: req.body.pokeType2,
  }
  UserData.findOneAndUpdate({Username: req.body.Username}, {$push:{ Team: newPokemonInfo}}, (err, data)=>{
    if(err) {return console.error(err)}
  })
  res.send();
})

/* Post: delete specific pokemon from team
*/

router.post('/deletePoke', (req,res)=>{
  UserData.findOneAndUpdate({Username: req.body.Username}, {$pull:{ Team:{pokeID:req.body.id}}}, (err, removedIndex)=>{
    if(err)return console.log(err);
  })
  res.send();
})

module.exports = router;
