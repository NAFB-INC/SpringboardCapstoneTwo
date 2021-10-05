import "./css/Video.css";
import React, { useEffect,useState } from "react";
import VideoAPI from "../api/VideoAPI";
// var ffmpeg = require('ffmpeg');
// const node_media_server = require('./media_server');
// 


function Video({user,presID,setTime}) {

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
            let camera_button = document.querySelector("#start-camera");
            let camera_button_stop = document.querySelector("#stop-camera");
            let start_button = document.querySelector("#start-record");
            let stop_button = document.querySelector("#stop-record");
            let video_player = document.querySelector("#video");
            let camera_stream = null;
            let media_recorder = null;
            let blobs_recorded = [];


            const getFrame = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video_player.videoWidth;
                canvas.height = video_player.videoHeight;
                canvas.getContext('2d').drawImage(video_player, 0, 0);
                const data = canvas.toDataURL('image/png');
                return data;
            }

            // const WS_URL = "ws://localhost:3002"
            // const FPS = 3;
            // const ws = new WebSocket(WS_URL);
            // ws.onopen = function(e) {
            //     console.log(`Connected to ${WS_URL}`);
            //     setInterval(() => {
            //         let data = getFrame();
            //         console.log("data sent:");
            //         console.log(data);
            //         ws.send(`${data}`);
            //     }, 1000 / FPS);
            // };
            

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
                const WS_URL = "ws://localhost:3002"
                const FPS = 10;
                const ws = new WebSocket(WS_URL);
                ws.onopen = function(e) {
                    console.log(`Connected to ${WS_URL}`);
                    setInterval(() => {
                        let data = getFrame();
                        console.log("data sent:");
                        console.log(data);
                        ws.send(`${data}`);
                    }, 1000 / FPS);
                };
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
                            // ws.send(e.data);
                            VideoAPI.addContent(presID,e.data);
                        }
                    }catch(err){
                        console.log(err);
                    }
                });
            
                // event : recording stopped & all blobs sent
                media_recorder.addEventListener('stop', function() {
                	// create local object URL from the recorded video blobs
                	// let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
                });
            
                // start recording with each recorded blob having 1 second video
                media_recorder.start(1000);
            });
            stop_button.addEventListener('click', function() {
                media_recorder.stop();

                start_button.hidden=true;
                stop_button.hidden=true;
                camera_button_stop.hidden=false;
                setRecording(false); 
            });
        }
        else if(user === "audience"){
            const img = document.querySelector('img');
        
            const WS_URL = 'ws://localhost:3002';
            const ws = new WebSocket(WS_URL);
            ws.onopen = () => console.log(`Connected to ${WS_URL}`);
            ws.onmessage = message => {
                // set the base64 string to the src tag of the image
                img.src = message.data;
            }
            let video_playback = document.querySelector("#video-playback");
            let video_feedback = document.querySelector("#video-feedback");
            if(!video_playback.srcObject){
                video_feedback.innerText="The presentation hasn't started yet!"
            }
        }
    },[presID]);

    useEffect(()=>{ 
        if(user==="audience"){
            fetchBlobs();
            setTimeout(()=>{
                startPlayback();
            },2000);
        }
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
                if(user==="presenter"){
                    setTime(i*2);
                }
                // console.log("new source: ",URL.createObjectURL(inputBlobs[i]))
                console.log(inputBlobs[i])
                // video_playback.src = inputBlobs[i];
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
                    <img id="playback" src=""></img>
                    <img id="playback2" src=""></img>
                    <div id="presenter-video-bounder">
                        <div className="outer-border">
                            <div className="mid-border">
                                <div className="iner-border">
                                    <video id="video" width="100%" height="100%" autoPlay hidden muted></video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="start-camera" className="present-choice-btn">Start Camera</button> 
                    <button id="stop-camera" className="present-choice-btn" hidden>Stop Camera</button>
                    <button id="start-record" className="present-choice-btn" hidden>Start Recording</button>
                    <button id="stop-record" className="present-choice-btn" hidden>Stop Recording</button>
                    {recording?<div>Recording</div>:null}
                </div>
            )
            // <a id="download-video" download="test.webm" hidden>Download Video</a>
        }else if(user==="audience"){
            return(
                <div>
                    <div id="video-feedback"></div>
                    <div id="audience-video-bounder">
                        <div className="outer-border">
                            <div className="mid-border">
                                <div className="inner-border">
                                    <img id="video-playback" src="" width="100%" height="100%"></img>
                                    <video id="" src="" width="100%" height="100%"></video>
                                </div>
                            </div>
                        </div>
                    </div>
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