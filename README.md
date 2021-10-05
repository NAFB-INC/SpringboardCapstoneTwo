# Marker
**The Presentation getter and setter.**

Need to quickly set up a presentation that is easily joined by only the people you want?
Look no further. This application is quick, sleek, and has your needs covered.
In addition, the audience can ask questions at any time, and by answering them you create benchmarks in your video playback.
How does it work? With a presentation code given to you upon creation. Make a presentation, and give out that code. It works both for watching back afterwards, and seeing it live!


### The Technical
This is a React application with a simple NodeJS Express server to go alongside it.
Most of the data transfer is handled by contexts and state, but there is an API javascript class that handles calls to the express server when needed.
The streaming is handled by a websocket, making this application effectively have 3 unique endpoint domains.
There is not currently a database linked to this application.

### How to Start
To start this application locally, you must:

1. Open a terminal or command line of any kind. I recommend Bash.
2. Clone and navigate to this repository.
3. Execute: >-cd simple_express_api_server
4. Execute: >npm install
5. Execute: >node app.js
6. Open a new command line or terminal.
7. Navigate back to the top of this repository.
8. Execute: >-cd video_benchmark
9. Execute: >npm install
10. Execute: >npm start

Step 10 may take a while. These steps will open the application on http://localhost:3000 , the api on http://localhost:3001 , and the websocket on ws://localhost:3002