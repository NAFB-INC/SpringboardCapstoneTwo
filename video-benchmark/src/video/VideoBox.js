import React from "react";
import Video from "../video/Video";
import BenchmarkList from "../video/BenchmarkList";

function VideoBox({user,presID}) {

    return (
        <div className="VideoBox">
            VideoBox
            <Video user={user} presID={presID}/>
            <BenchmarkList presID={presID}/>
        </div>
    );
}

export default VideoBox;