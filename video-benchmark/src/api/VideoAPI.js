class VideoAPI {
    constructor() {
        this.codes = {};
        this.videos = [
            {
                title:"How to Program",
                duration:"5:20",
                presenter:{
                    first:"John",
                    last:"Jacob"
                },
                code:"abc123"
            }
        ]
        this.resetCodeLibrary();
    }

    resetCodeLibrary(){
        this.codes={};
        console.log(this.videos)
        this.videos.forEach((video)=>
            this.codes[video.code]=1
        )
    }

    findIfValidCode(code){
        if(this.codes[code]){
            return true;
        }
        return false;
    }

}

export default VideoAPI;