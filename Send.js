import React from 'react';
import '../Css/Send.css';
import Result from './Result';

class Send extends React.Component{
    constructor(){
        super();
        this.state = {
            PROGRESS:0,
            FILES : [],
            SIZE : 5e+6,
            UPLOADED:false,
            URL : ''
        };
    }
    random = () =>{
        var result = '';
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        result += String(Math.floor(Math.random() * 100) + 1);
        for (var i = 10; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        result += String(Math.floor(Math.random() * 100) + 1);
        console.log(result);
        return result;
    }
    upload = () =>{
        let len = this.state.FILES.length;
        if (len === 0){
            try{
                document.getElementById("alert").style.display = "block"
                document.getElementById("alert").innerHTML="Please Select atleast 1 file"
                setTimeout(function(){ 
                    document.getElementById("alert").style.display="none"; 
                }, 1000);
            }
            catch(err){
                // console.log(err);
            }
        }
        else{
            try{
                console.log("uploading file ");
                const storageRef  = firebase.storage().ref();
                let folderName = this.random();
                for(let i of this.state.FILES){
                    this.setState ({PROGRESS : parseFloat(0)});
                    const fileToUpload = storageRef.child(folderName+'/'+i.name);
                    let uploadTask = fileToUpload.put(i);
                    uploadTask.then(snapshot => {
                        console.log('File Uploaded Successfully');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                document.getElementById("alert").style.display = "block"
                                document.getElementById("alert").innerHTML="Sorry, we are facing some problem!!"
                                setTimeout(function(){ 
                                    document.getElementById("alert").style.display="none"; 
                                }, 1000);
                              break;
                            case firebase.storage.TaskState.RUNNING:
                                document.getElementById("alert").style.display = "block";
                                document.getElementById("alert").setAttribute = ("color","primary");
                                document.getElementById("alert").innerHTML="Sorry, we are facing some problem!!"
                                setTimeout(function(){ 
                                    document.getElementById("alert").style.display="none"; 
                                }, 1000);
                              break;
                            default: break;
                          }
                    });
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        snapshot => {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            this.setState ({PROGRESS : parseFloat(progress)});
                        }, 
                        error => { 
                            document.getElementById("alert").style.display = "block"
                            document.getElementById("alert").innerHTML="Sorry, we are facing some problem!!"
                            setTimeout(function(){ 
                                document.getElementById("alert").style.display="none"; 
                            }, 3000);
                        },()=>{
                            this.state.FILES.shift();
                            if(this.state.FILES.length === 0){
                                this.setState({UPLOADED:true, URL: folderName});
                            }
                        }
                    );
                }    
            }  
            catch(err){
                document.getElementById("alert").style.display = "block"
                document.getElementById("alert").innerHTML="Sorry, we are facing some problem!!"
                setTimeout(function(){ 
                    document.getElementById("alert").style.display="none"; 
                }, 1000);
            }
            var list = document.getElementById("filedisplaylist");
            var child = list.lastElementChild;  
            while (child) { 
                list.removeChild(child); 
                child = list.lastElementChild; 
            } 
        }
    }
    filepick = () => {
        let input = document.createElement("input");
        input.type="file";
        input.multiple = "multiple";
        input.onchange = e => { 
            var files = e.target.files;
            // console.log(files);
            for(let file of files){
                let size = file.size;
                let oldVal = this.state.SIZE;
                if (oldVal-size>=0 && this.state.FILES.length<5){
                    this.state.FILES.push(file);
                    this.setState({SIZE : parseFloat(oldVal)-parseFloat(size)});
                    let list = document.createElement("LI");
                    let node = document.createTextNode(String(file.name)+String("    ")+"("+String((size/(1e+6)).toFixed(2))+" MB)");
                    list.appendChild(node);
                    document.getElementById("filedisplaylist").appendChild(list);
                }
                else{
                    document.getElementById("alert").style.display = "block";
                    document.getElementById("alert").innerHTML="Your Files exceed the 5MB limit!!!";
                    setTimeout(function(){ 
                        document.getElementById("alert").style.display="none"; 
                    }, 2000);
                }
            }
        }
        input.click();
    } 
    removeFile = e => {
        let tgt = e.target;
        if (tgt.tagName.toUpperCase() === "LI") {
            let nodes = Array.from( tgt.parentNode.children );
            let index = nodes.indexOf( tgt );
            let file = this.state.FILES;
            let filesize = file.slice(index,index+1)[0].size;
            file.splice(index,1);
            let oldSize = this.state.SIZE;
            this.setState({SIZE : parseFloat(oldSize)+parseFloat(filesize),FILES:file});         
            tgt.parentNode.removeChild(tgt); 
        }
         
    }
    render(){
        if(this.state.UPLOADED === false){
            return(
                <div className="send">
                    <div className="imgPanel">
                        <img src={require("./image/send.jpg")} width={"650px"} alt="sharing file" className="sendImage"/>
                    </div>
                    <div className="filePicker" >
                        <div className="filePicker-content">
                            <img src={require("./image/plus.png")} width="100px" alt="Symbol of addition" onClick={this.filepick}/>
                            <h5>Add Files</h5>
                            <button id="upload" onClick={this.upload}>Upload</button>
                            <progress id="statusIndicatorSend" value={this.state.PROGRESS} max="100" />
                            <div className='filedisplay'> 
                                <h5>Add more files</h5>
                                <p style={{borderBottom:'1px solid grey',marginBottom:'0'}}>{this.state.FILES.length} files added - {(this.state.SIZE/1e+6).toFixed(2)} MB remaining </p>
                                <p style={{fontSize:'12px'}}>click to remove files</p>
                                <ul id="filedisplaylist" style={{marginTop:"20px"}} onClick={this.removeFile}>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div color="danger" id="alert">
                    </div>
                </div>
            );
        }
        else if((this.state.UPLOADED === true) && (this.state.URL.length > 0)){

            return(
                <Result url={this.state.URL}/>
            );
        }
    }
}

export default Send;
