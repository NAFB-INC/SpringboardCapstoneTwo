import React from "react";
import Video from "../video/Video";
//import BenchmarkList from "../video/BenchmarkList";

//box to contain the video and benchmarks
//this is rendered for both the audience and the presenter, so its important to know which user is the current one.
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