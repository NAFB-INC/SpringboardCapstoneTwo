import React, { useEffect,useState } from "react";
import VideoAPI from "../api/VideoAPI";
import Benchmark from "../video/Benchmark";

function BenchmarkList({presID}) {

    const [benchmarks,setBenchmarks] = useState();

    useEffect(function fetchBenchmarks(){
        async function callForBenchmarks(){
            console.log("presID",presID)
            let myBenchmarks = (await(VideoAPI.fetchVideo(presID)))["video"].benchmarks;
            setBenchmarks(myBenchmarks);
        }
        callForBenchmarks();
    },[presID]);

    if(benchmarks && benchmarks.length){
        return (
            <div className="BenchmarkList">
                <ul>
                    {benchmarks.map((mark)=>{return <Benchmark mark={mark}/>})}
                </ul>
            </div>
        );
    } else {
        return (
            <div className="BenchmarkList">
                Empty Benchmark List
            </div>
        );
    }
}

export default BenchmarkList;