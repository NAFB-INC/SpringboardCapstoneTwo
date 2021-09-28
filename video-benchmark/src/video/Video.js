import React, { useEffect,useState } from "react";


function Video({user}) {

    function stopBothVideoAndAudio(stream) {
        console.log("stream",stream);
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });
    }

    const [recording,setRecording] = useState(false);


    useEffect(()=>{
        let camera_button = document.querySelector("#start-camera");
        let camera_button_stop = document.querySelector("#stop-camera");
        let start_button = document.querySelector("#start-record");
        let stop_button = document.querySelector("#stop-record");
        let download_link = document.querySelector("#download-video");
        let camera_stream = null;
        let media_recorder = null;
        let blobs_recorded = [];

        console.log(`camerabutton: ${camera_button}`,`camerabuttonstop: ${camera_button_stop}`)
    
        camera_button.addEventListener('click', async function() {
                let video_player = document.querySelector("#video");
                camera_stream = await (navigator.mediaDevices.getUserMedia({ video: true, audio: true }));
                video_player.srcObject = camera_stream;
                camera_button.hidden=true;
                camera_button_stop.hidden=false;
                video_player.hidden = false;
                setRecording(true);
                start_button.hidden=false;
            });
        camera_button_stop.addEventListener('click', ()=>{
                let video_player = document.querySelector("#video");
                stopBothVideoAndAudio(video_player.srcObject);
                video_player.srcObject=null;
                camera_button.hidden=false;
                camera_button_stop.hidden=true;
                video_player.hidden = true;
                start_button.hidden=true;


                setRecording(false);
            });

        start_button.addEventListener('click', function() {
            start_button.hidden=true;
            stop_button.hidden=false;


            // set MIME type of recording as video/webm
            media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
        
            // event : new recorded video blob available 
            media_recorder.addEventListener('dataavailable', function(e) {
        		blobs_recorded.push(e.data);
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
	        media_recorder.stop(); 
        });
    },[])

    function connectToVideo(){
        let video = document.querySelector("#video");
        if(user==="presenter"){
            return(
                <div>
                    <button id="start-camera">Start Camera</button> <button id="stop-camera" hidden>Stop Camera</button>
                    <video id="video" width="320" height="240" autoPlay hidden></video>
                    <button id="start-record" hidden>Start Recording</button>
                    <button id="stop-record" hidden>Stop Recording</button>
                    <a id="download-video" download="test.webm" hidden>Download Video</a>
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