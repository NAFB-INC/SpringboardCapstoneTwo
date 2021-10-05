const axios = require("axios");
const BSON = require('bson');
const Long = BSON.Long;

class VideoAPI {
    static BASE_URL = "http://localhost:3001/"
    static codes = {};
    static videos = []
    static upcoming = {};

    static questions = {}

    static async addContent(code,blobToAdd){
        if(this.upcoming[code]){
            let video = this.upcoming[code];
            // if(video.content.lock){
            //     while(video.content.lock){
            //         if(!video.content.lock){
            //             video.content.lock=true;
            //             video.content.blobs.push(blobToAdd);
            //             video.content.lock=false;
            //         }
            //     }
            // }else{
            //     video.content.lock=true;
            //     video.content.blobs.push(blobToAdd);
            //     video.content.lock=false;
            // }
        }

        let url = URL.createObjectURL(blobToAdd);
        let res = await axios.post(`${this.BASE_URL}test`,url);
        console.log("input:",url);
        console.log("output:",res.data);
    }
    static async fetchLiveContent(code,index){
        let data_upcoming = await axios.get(`${this.BASE_URL}upcoming`);
        this.upcoming=data_upcoming.data;

        if(this.upcoming[code]){
            let video = this.upcoming[code];
            let res = video.content.blobs[index];
            if(res){
                const doc_2 = JSON.parse(res);
                let myResult = "";
                for(let key of Object.keys(doc_2)){
                    myResult = myResult+doc_2[key];
                }
                return myResult;
            }else{
                return null;
            }
        }
    }

    static async resetDataLibrary(){
        console.log('resetting library');
        let data_codes = await axios.get(`${this.BASE_URL}codes`);
        let data_videos = await axios.get(`${this.BASE_URL}videos`);
        let data_upcoming = await axios.get(`${this.BASE_URL}upcoming`);
        let data_questions = await axios.get(`${this.BASE_URL}questions`);
        this.codes=data_codes.data;
        this.videos=data_videos.data;
        this.upcoming=data_upcoming.data;
        this.questions=data_questions.data;

        this.videos.forEach((video)=>
            this.codes[video.code]=1
        )
        Object.entries(this.upcoming).forEach((key)=>{
            this.codes[key[0]]=1;
        })

        await axios.post(`${this.BASE_URL}codes`,this.codes);

        console.log(this.upcoming);
    }

    static async findIfValidCode(code,pass=null){
        if(!pass){
            if(this.codes[code]){
                console.log("valid code!");
                return true;
            }
            console.log("invalid code!");
            return false;
        }else{
            console.log(this.upcoming[code])
            console.log(this.codes)
            console.log(!!this.codes[code])
            console.log(pass)
            if(this.codes[code] && this.upcoming[code]["pass"]===pass){
                console.log("valid code!");
                return true;
            }
            console.log("invalid code or password!");
            return false
        }
    }

    static async fetchVideo(code){
        console.log("fetching video..");

        if(this.upcoming[code]){
            console.log(this.upcoming[code])
            return {"video":this.upcoming[code],"current":true};
        }
        for(let video of this.videos){
            if(video.code === code) {
                console.log("returning video", video)
                return {"video":video,"past_video":true};
            }
        }
        return null;
    }

    static async fetchQuestions(code){
        let data_questions = await axios.get(`${this.BASE_URL}questions`);
        this.questions=data_questions.data;

        if(this.questions[code]){
            return this.questions[code];
        }else{
            return {}
        }
    }

    static async addQuestion(code,questionText){
        //redundant code to ensure api consistency, but kept here just in case of refactoring later
        let data_questions = await axios.get(`${this.BASE_URL}questions`);
        this.questions=data_questions.data;


        if(this.questions[code]){
            let id = Object.keys(this.questions[code]).length +1;
            this.questions[code][id] = questionText;
        }else{
            this.questions[code] = {1:questionText};
        }
        await axios.post(`${this.BASE_URL}questions`,this.questions);
    }

    static async createPresentation(inputValues){
        let first = inputValues.first || "First";
        let last = inputValues.last || "Last";
        let title = inputValues.title || "Untitled Presentation";
        let date = new Date();
        console.log("date: ",date);
        
        if(!inputValues.pass){
            throw new Error("Password is required!!")
        }

        let newCode = await this.generateCode();
        this.codes[newCode]=1;

        let newPresentation = {
            title,
            presenter:{
                first,
                last
            },
            description:inputValues.desc,
            created:date,
            code:newCode,
            pass:inputValues.pass
        };

        this.upcoming[newCode] = newPresentation;
        console.log(`returning code ${newCode}`);
        console.log("upcoming: ",this.upcoming);
        await axios.post(`${this.BASE_URL}codes`,this.codes);
        await axios.post(`${this.BASE_URL}upcoming`,this.upcoming);

        return(newCode);
    }

    static async generateCode(){
        let letters = ["a","b","c","d","f","g","k","m","n","p","r","t","W","X","Y","Z","A","D","G","R"];
        let variable = false;


        while(!variable){
            let code = "";
            for(let i=0;i<6;i++){
                let evenOrOdd = Math.floor(Math.random()*2);
                console.log(evenOrOdd);
                if(evenOrOdd === 0){
                    code = code+(letters[Math.floor(Math.random()*letters.length)]);
                }else{
                    code = code+(`${Math.floor(Math.random()*10)}`)
                }
            }
            console.log(code);
            let validCodeCheck = await this.findIfValidCode(code);
            if(!validCodeCheck && code)
            {
                console.log(`generated code ${code}`)
                return code;
            }
            variable=true;
        }
    }

    static async addBenchmark(code,num,time){
        if(this.upcoming[code]){
            console.log(num,time);
            this.upcoming[code]["benchmarks"].push({
                question_id:num,
                time_stamp:time
            }) ;
        }else{
            throw new Error("presentation doesn't exist!");
        }
        await axios.post(`${this.BASE_URL}upcoming`,this.upcoming);
    }

    static async removeBenchmark(code,num){
        if(this.upcoming[code]){
            delete this.upcoming[code]["benchmarks"][num];
            delete this.questions[code][num];
        }else{
            throw new Error("presentation doesn't exist!");
        }
        await axios.post(`${this.BASE_URL}upcoming`,this.upcoming);
    }

}

export default VideoAPI;