import Navbar from "./Navbar"
import { useParams } from "react-router-dom"
import { auth } from "../firebase";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrainerCard = () => {
    const {teamParam} = useParams();
    const [selectedTeam, setSelectedTeam] = useState(teamParam)
    const [trainerTeam, setTrainerTeam] = useState([])
    const navigate = useNavigate();
    const renderTeam = async() =>{
        
        const team = []
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: auth.currentUser.email}),
        })
        .then((response)=> { return response.json()})
        .then((data) => {
          if(selectedTeam === 'Team1'){
            for (let i = 0; i < data[0].Team1.length; ++i ) {
                team.push(data[0].Team1[i]);
              }
          }else if(selectedTeam === 'Team2'){
            for (let i = 0; i < data[0].Team2.length; ++i ) {
                team.push(data[0].Team2[i]);
              }
          }else{
            for (let i = 0; i < data[0].Team3.length; ++i ) {
                team.push(data[0].Team3[i]);
              }
            }
          setTrainerTeam(team) 
          }
        )
        .catch((error) =>console.log(error))

    }

    useEffect(() => {
        setSelectedTeam(teamParam)
        renderTeam();
    }, [])
    return (    
        <div>
            <Navbar/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Trainer Card</h5>
                    <p className="card-text">Username: </p>
                    <div>
                        <button type="button">left</button>
                        <img src="" alt="trainerSprites"></img>
                        <button type="button">right</button>
                    </div>
                {/* open circles for pokemon team sprites */}
                {trainerTeam && trainerTeam.map((poke, index)=>
                    <div >
                        <img key={index} src={poke.pokeImage} alt="pokemonSprite"></img>
                    </div>
                    
                )}
                </div>
            </div>
            <button type="button" onClick={()=>{navigate("/")}}>Home</button>
        </div>
        
    )

}

export default TrainerCard