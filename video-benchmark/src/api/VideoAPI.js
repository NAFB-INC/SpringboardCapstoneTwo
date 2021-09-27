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
    static upcoming = [];
    // constructor() {
    //     this.codes = {};
    //     this.videos = [
    //         {
    //             title:"How to Program",
    //             duration:"5:20",
    //             presenter:{
    //                 first:"John",
    //                 last:"Jacob"
    //             },
    //             code:"abc123",
    //             description:""
    //         }
    //     ]
    //     this.upcoming = [];
    //     this.resetCodeLibrary();
    // }

    static async resetCodeLibrary(){
        this.codes={};
        console.log(this.videos)
        this.videos.forEach((video)=>
            this.codes[video.code]=1
        )
        this.upcoming.forEach((video)=>
            this.codes[video.code]=1
        )
    }

    static async findIfValidCode(code){
        if(this.codes[code]){
            return true;
        }
        return false;
    }

    static async fetchVideo(code){
        console.log("fetching video..")
        for(let video of this.videos){
            if(video.code === code) {
                console.log("returning video", video)
                return video;
            }
        }
        return null;
    }

    static async createPresentation(inputValues){
        let first = inputValues.first || "First";
        let last = inputValues.last || "Last";
        let title = inputValues.title || "Untitled Presentation";
        
        if(!inputValues.pass){
            throw new Error("Password is required!!")
        }

        this.upcoming.push({

        })
    }

}

export default VideoAPI;