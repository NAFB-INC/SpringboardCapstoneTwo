import React from "react";
import Video from "../video/Video";
//import BenchmarkList from "../video/BenchmarkList";

function VideoBox({user,presID,setTime}) {

    function benchmarkAudienceOnly(){
        if(user==="audience"){
            //return <BenchmarkList presID={presID}/>;
        }
        return null;
    }

    return (
        <div className="VideoBox">
            <Video user={user} presID={presID} setTime={setTime}/>
            {benchmarkAudienceOnly()}
        </div>
    );
}

export default VideoBox;