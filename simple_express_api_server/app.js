"use strict";

const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');

const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/codes', (req, res) => {
    let rawData = fs.readFileSync('data.json');
    let codes = JSON.parse(rawData)["codes"];
    res.send(codes);
});

app.get('/videos', (req, res) => {
    let rawData = fs.readFileSync('data.json');
    let videos = JSON.parse(rawData)["videos"];
    res.send(videos);
});

app.get('/upcoming', (req, res) => {
    let rawData = fs.readFileSync('data.json');
    let upcoming = JSON.parse(rawData)["upcoming"];
    res.send(upcoming);
});

app.get('/questions', (req, res) => {
    let rawData = fs.readFileSync('data.json');
    let questions = JSON.parse(rawData)["questions"];
    res.send(questions);
});



app.post('/codes', (req, res) => {
    let myData = JSON.parse(fs.readFileSync('data.json'));
    let codes = req.body;
    myData["codes"]=codes;
    let jsonData = JSON.stringify(myData)
    fs.writeFileSync('data.json', jsonData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
      })
    res.send(`OK`);
});
app.post('/videos', (req, res) => {
    let myData = JSON.parse(fs.readFileSync('data.json'));
    let videos = req.body;
    myData["videos"]=videos;
    let jsonData = JSON.stringify(myData)
    fs.writeFileSync('data.json', jsonData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
      })
    res.send(`OK`);
});
app.post('/upcoming', (req, res) => {
    let myData = JSON.parse(fs.readFileSync('data.json'));
    let upcoming = req.body;
    myData["upcoming"]=upcoming;
    let jsonData = JSON.stringify(myData)
    fs.writeFileSync('data.json', jsonData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
      })
    res.send(`OK`);
});
app.post('/questions', (req, res) => {
    let myData = JSON.parse(fs.readFileSync('data.json'));
    let questions = req.body;
    myData["questions"]=questions;
    let jsonData = JSON.stringify(myData)
    fs.writeFileSync('data.json', jsonData, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
      })
    res.send(`OK`);
});





const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 3002 });
let connectedClients = [];

wsServer.on('connection', (ws, req) => {
    console.log('Connected');
    // add new connected client
    connectedClients.push(ws);
    // listen for messages from the streamer, the clients will not send anything so we don't need to filter
    ws.on('message', (data) => {
        // send the base64 encoded frame to each connected ws
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) { // check if it is still connected
                ws.send(data.toString()); // send
            } else { // if it's not connected remove from the array of connected ws
                connectedClients.splice(i, 1);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Data app listening at http://localhost:${port}`)
})

module.exports = app;