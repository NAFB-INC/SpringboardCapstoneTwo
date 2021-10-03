import React, { useEffect,useState } from "react";
import VideoAPI from "../api/VideoAPI";
// var ffmpeg = require('ffmpeg');
// const node_media_server = require('./media_server');
// 


function Video({user,presID}) {

    //node_media_server.run();

    function stopBothVideoAndAudio(stream) {
        console.log("stream",stream);
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });
    }

    const [recording,setRecording] = useState(false);
    const [inputBlobs,setInputBlobs] = useState([]);


    useEffect(()=>{
        if(user === "presenter")
        {
            const socket = new WebSocket("ws://localhost:3002");
            socket.onopen = function(e) {
                alert("[open] Connection established");
                alert("Sending to server");
                socket.send("My name is John");
            };
            let camera_button = document.querySelector("#start-camera");
            let camera_button_stop = document.querySelector("#stop-camera");
            let start_button = document.querySelector("#start-record");
            let stop_button = document.querySelector("#stop-record");
            let download_link = document.querySelector("#download-video");
            let video_player = document.querySelector("#video");
            let camera_stream = null;
            let media_recorder = null;
            let blobs_recorded = [];

            console.log(`camerabutton: ${camera_button}`,`camerabuttonstop: ${camera_button_stop}`)
            
            camera_button.addEventListener('click', async function() {
                    camera_stream = await (navigator.mediaDevices.getUserMedia({ video: true, audio: true }));
                    video_player.srcObject = camera_stream;
                    camera_button.hidden=true;
                    camera_button_stop.hidden=false;
                    video_player.hidden = false;
                    start_button.hidden=false;
                });
            camera_button_stop.addEventListener('click', ()=>{
                    stopBothVideoAndAudio(video_player.srcObject);
                    video_player.srcObject=null;
                    camera_button.hidden=false;
                    camera_button_stop.hidden=true;
                    video_player.hidden = true;
                    start_button.hidden=true;
                });

            start_button.addEventListener('click', function() {
                start_button.hidden=true;
                stop_button.hidden=false;
                camera_button_stop.hidden=true;
                setRecording(true);


                // set MIME type of recording as video/webm
                media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
            
                // event : new recorded video blob available 
                media_recorder.addEventListener('dataavailable', function(e) {
                    // blobs_recorded.push(e.data);
                    try{
                        if (e.data && e.data.size > 0) {
                            socket.send(e.data);
                        }
                        // VideoAPI.addContent(presID,e.data);
                    }catch(err){
                        console.log(err);
                    }
                });
            
                // event : recording stopped & all blobs sent
                media_recorder.addEventListener('stop', function() {
                	// create local object URL from the recorded video blobs
                	let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
                	download_link.href = video_local;
                });
            
                // start recording with each recorded blob having 1 second video
                media_recorder.start(1000);
            });
            stop_button.addEventListener('click', function() {
                start_button.hidden=true;
                stop_button.hidden=true;
                download_link.hidden=false;
                camera_button_stop.hidden=false;
                media_recorder.stop();
                setRecording(false); 
            });
        }
        else if(user === "audience"){
            let video_playback = document.querySelector("#video-playback");
            let video_feedback = document.querySelector("#video-feedback");
            if(!video_playback.srcObject){
                video_feedback.innerText="The presentation hasn't started yet!"
            }
        }
    },[presID]);

    useEffect(()=>{
        fetchBlobs();
        setTimeout(()=>{
            startPlayback();
        },2000);
    },[]);

    async function fetchNewBlob(id,index){
        let newBlob = await VideoAPI.fetchLiveContent(id,index);
        console.log(`received blob: ${newBlob}`);
        if(newBlob){
            inputBlobs[index]=newBlob;
            setInputBlobs([...inputBlobs]);
        }
    }

    async function startPlayback(index=0){

        function playNextBlob(i){
            let video_playback = document.querySelector("#video-playback");
            console.log(`attempting to play blob ${i}`)
            try{
                // console.log("new source: ",URL.createObjectURL(inputBlobs[i]))
                console.log(inputBlobs[i])
                // video_playback.src = URL.createObjectURL(inputBlobs[i]);
                video_playback.src = URL.createObjectURL(new Blob(inputBlobs, { type: 'video/webm' }))+`#t=${i*2}`;
                video_playback.load();
                video_playback.play();
            }catch(e){
                console.log(e)
            }

        }

        setTimeout(()=>{
            if(inputBlobs[index]){
                playNextBlob(index);
                startPlayback(index+1);
            }else{
                startPlayback(index);
            }
        },2000)
    }

    async function fetchBlobs(){
        setTimeout(()=>{
            try{
                let blobCounter = inputBlobs.length;
                console.log(`fetching index ${blobCounter} blob from api...`)
                fetchNewBlob(presID,blobCounter);
            }catch(e){
                console.log(e)
            }
            fetchBlobs();
        },1000)
    }


    function connectToVideo(){
        if(user==="presenter"){
            return(
                <div>
                    <button id="start-camera">Start Camera</button> <button id="stop-camera" hidden>Stop Camera</button>
                    <video id="video" width="320" height="240" autoPlay hidden></video>
                    <button id="start-record" hidden>Start Recording</button>
                    <button id="stop-record" hidden>Stop Recording</button>
                    <a id="download-video" download="test.webm" hidden>Download Video</a>
                    {recording?<div>Recording</div>:null}
                </div>
            )
        }else if(user==="audience"){
            return(
                <div>
                    <div id="video-feedback"></div>
                    <video id="video-playback" width="320" height="240"></video>
                </div>
            )
        }
    }

    
    return (
        <div className="Video">
            {connectToVideo()}
        </div>
    );
}

export default Video;