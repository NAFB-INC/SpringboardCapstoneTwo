import React, { useEffect,useState } from "react";
import VideoAPI from "../api/VideoAPI";
import Benchmark from "../video/Benchmark";

//displays the benchmarks related to the currently watched video
//only available to audience and audience mode of past videos
function BenchmarkList({presID}) {

    const [benchmarks,setBenchmarks] = useState();

    //gets them from the api
    useEffect(function fetchBenchmarks(){
        async function callForBenchmarks(){
            console.log("presID",presID)
            let myBenchmarks = (await(VideoAPI.fetchVideo(presID)))["video"].benchmarks;
            setBenchmarks(myBenchmarks);
        }
        callForBenchmarks();
    },[presID]);

    //if any were received, display them
    if(benchmarks && benchmarks.length){
        return (
            <div className="BenchmarkList">
                <ul>
                    {benchmarks.map((mark)=>{return <Benchmark mark={mark}/>})}
                </ul>
            </div>
        );
    //if none,
    //TODO
    } else {
        return (
            <div className="BenchmarkList">
                Empty Benchmark List
            </div>
        );
    }
}

export default BenchmarkList;