class VideoAPI {
    static codes = {};
    static videos = [
        {
            title:"How to Program",
            duration:"5:20",
            presenter:{
                first:"John",
                last:"Jacob"
            },
            code:"abc123",
            description:""
        }
    ]
    static upcoming = {
        "ZAfZ8n": {
            title:"My Presentation Title",
            presenter:{
                first:"Bob",
                last:"Bings"
            },
            description:"A simple sample simile",
            created:"now",
            code:"ZAfZ8n",
            pass:"123"
        }
    };

    static async resetCodeLibrary(){
        console.log('resetting library');
        this.codes={};
        this.videos.forEach((video)=>
            this.codes[video.code]=1
        )
        Object.entries(this.upcoming).forEach((key)=>{
            this.codes[key[0]]=1;
        })
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
        console.log("fetching video..")
        if(this.upcoming[code]){
            console.log(this.upcoming[code])
            return {"current":this.upcoming[code]};
        }
        for(let video of this.videos){
            if(video.code === code) {
                console.log("returning video", video)
                return {"past_video":video};
            }
        }
        return null;
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

}

export default VideoAPI;