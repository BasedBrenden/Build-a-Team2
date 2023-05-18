import Navbar from "./Navbar"
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom"
import { auth } from "../firebase";
import { useState,useEffect } from "react";
import gen1boy from "../images/gen1boy.png";
import { useNavigate } from "react-router-dom";
import './componentsStyling/TrainerCard.css'

const TrainerCard = () => {
    const {teamParam} = useParams();
    const [selectedTeam, setSelectedTeam] = useState(teamParam)
    const [trainerTeam, setTrainerTeam] = useState([])
    const [trainerName, setTrainerName] = useState('')
    const navigate = useNavigate();
    const renderTeam = async() =>{
        
        const team = []
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: auth.currentUser.email}),
        })
        .then((response)=> { return response.json()} )
        .then((data) => {
            setTrainerName(data[0].trainerName);
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

    const download = (uri, filename) => {

        var link = document.createElement('a');
    
        if (typeof link.download === 'string') {
    
            link.href = uri;
            link.download = filename;
    
            //Firefox requires the link to be in the body
            document.body.appendChild(link);
    
            //simulate click
            link.click();
    
            //remove the link when done
            document.body.removeChild(link);
    
        } else {
    
            window.open(uri);
    
        }
    }

    const downloadCard = () =>{
        const card = document.querySelector(".card-body");

        html2canvas(card, { logging: false, letterRendering: 1,  allowTaint: false , useCORS: true }).then(canvas => {
            download(canvas.toDataURL("image/png"),"trainerCard.png");
            console.log("enjoy your card!")
        });
        console.log("Downloading your card!");
        
    }

    useEffect(() => {
        setSelectedTeam(teamParam)
        renderTeam();
    }, [])
    return (    
        <div className="trainerCardContainer">
            <Navbar/>
        <div className="card">
            
            <div>
                <div className="card-buttons">
                    <form>
                        <label>Change Outline Colors</label>
                        <select>
                            <option value="">Red</option>
                            <option value="">Blue</option>
                            <option value="">Green</option>
                            <option value="">Yellow</option>
                            <option value="">Grey</option>
                        </select>
                    </form>
                    <form>
                        <label>Change Background</label>
                        <select>
                            <option value="">Volcano</option>
                            <option value="">Antarctic</option>
                            <option value="">Rainforest</option>
                            <option value="">Dunes</option>
                            <option value="">Cave</option>
                            <option value="">Open Ocean</option>
                            <option value="">Black Hole</option>
                            <option value="">Star Nursery</option>
                            <option value="">Fighting Ring</option>
                            <option value="">Midas Touch</option>
                        
                        </select>
                    </form>
                    <form>
                        <label>Change Trainer Sprite</label>
                        <select>
                            <option value="">Gen1 Boy</option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </form>
                </div>
                <div className="card-container">
                    <div className="card-body">
                        <div className="card-name">
                            <h5 className="card-title">{trainerName}</h5>
                        </div>
                        <div className="trainerPhoto">
                            <img className="trainerHeadshot" src={gen1boy} alt="trainerSprites"></img>
                        </div>
                        <div className="cardTeam">
                        {trainerTeam.map((poke, index)=>
                            <div className="memberBackground">
                                <img key={index} src={poke.pokeImage} alt="pokemonSprite"></img>
                            </div>
                        )}
                        </div>
                    {/* open circles for pokemon team sprites */}
                    
                    </div>
                </div>
            </div>
            <div className="options">
                <button type="button" className="homeBtn" onClick={()=>{navigate("/")}}>Home</button>
                <button type="button" id="downloadBtn" onClick={()=>{downloadCard()}}>Download</button>
            </div>
            
        </div>
        </div>
        
    )

}

export default TrainerCard