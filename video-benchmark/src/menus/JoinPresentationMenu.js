import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../hooks/UserContext";
import CodeForm from "../forms/CodeForm";

function JoinPresentationMenu({myUser}) {
    const { stage,setStage,API } = useContext(UserContext);
    const [code,setCode] = useState("");
    const [video,setVideo] = useState(false);
    const [user,setUser] = useState("");


    useEffect(function getVideoByCode() {
        async function getVideo() {
            let myVideo = await API.current.fetchVideo(code);
            console.log(myVideo);
            if(myVideo){
                console.log("video: ",myVideo);
                setVideo(myVideo);
            }
        }
        if(code && stage > 2){
            getVideo();
        }
      }, [code,stage,setStage,API]);

    useEffect(function determineMyUser(){
        if(myUser==="presenter"){
            setUser(myUser);
            setStage(1);
        }
        else if (myUser==="audience") {
            setUser(myUser);
            setStage(2);
        }
    },[stage,setStage,setUser,myUser])

    function stageSelection(){
        if(stage===1){
            return(
                <div>
                    <CodeForm setCode={setCode} presenter={true}/>
                </div>
            );
        }
        if(stage===2){
            return(
                <div>
                    <CodeForm setCode={setCode}/>
                </div>
            );
        }
        else if(stage===3){
            if(!video){
                return(
                    <div>
                        Retrieving Video Details...
                    </div>
                );
            } else {
                return(
                    <div>
                        Found a match!
                        <div>
                            <div><Link to={`/${user}/${code}`}>{video.title} </Link> </div>
                            <div>presented by {video.presenter.first} {video.presenter.last}</div>
                            <div><small>{video.duration}</small></div>
                        </div>
                        
                    </div>
                );
            }
        }else{
            setStage(2)
        }
    };
    
    return (
        <div className="JoinPresentationMenu">
            JoinPresentationMenu
            {stageSelection()}
        </div>
    );
}

export default JoinPresentationMenu;