import React from "react";
import Video from "../video/Video";
import BenchMarkList from "../video/BenchMarkList";

function VideoBox({user}) {

    return (
        <div className="VideoBox">
            VideoBox
            <Video user={user}/>
            <BenchMarkList/>
        </div>
    );
}

export default VideoBox;