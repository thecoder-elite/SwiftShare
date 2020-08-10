import React,{Component} from 'react';
import '../Css/Result.css';

class Result extends Component{
    constructor(props){
        super(props);
        this.state ={
            URL : this.props.url
        }
    }
    share =() =>{
        if (navigator.canShare) {
            navigator.share({
              url : this.state.URL,
              title: 'My Shared Files',
              text: 'Please download these files',
            })
            .catch((error) => console.log('Sharing failed', error));
          } else {
            let a  = document.createElement('a');
            a.setAttribute("href","whatsapp://send?text=Hii there, I am sharing some files with you. Download them using the code:  \n"+this.state.URL+"\n    at  http://192.168.0.104:3000");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
    }
    copy = () =>{
        let url = document.getElementById('copy').value;
        navigator.clipboard.writeText(url);
        console.table("copied");
        let alert = document.getElementById("alertResult")
        alert.style.display = "block"
        alert.innerHTML="copied"
        setTimeout(function(){ 
            alert.style.display="none"; 
        }, 1000);
    }
    render(){
        return(
            <div className="Result">
                <div className="textbox">
                    <input type="text" readOnly={true} id="copy" value={this.state.URL} />
                    <button onClick={this.share} className="share" style={{outline:"none"}}> <img src={require('./image/share.png')} alt="share icon" style={{backgroundColor:"white"}}/> </button>
                </div>
                <p style={{width:"80%",textAlign:"center",marginTop:"20px"}}><u>Note</u>:  Directly enter the code in the downloads section to Download Your Files</p>
                <button onClick={this.copy} className="CopyButton" style={{outline:"none"}}>Copy</button>
                <img alt='file transfer sucessful' src={require('./image/result.jpg')} width={"400px"}/>
                <div color="success" id="alertResult">
                </div>
            </div>
        );     
    }
}

export default Result;