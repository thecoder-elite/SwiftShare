import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../Css/Home.css';
import { Redirect } from 'react-router';

class App extends Component{
  constructor(){
    super();
    this.state ={
      sendRedirect : false,
      recieveRedirect : false
    }
  }
  handleOnClickSend = () => {
    this.setState({sendRedirect: true});
  }
  handleOnClickRecieve = () => {
    this.setState({recieveRedirect: true});
  }
  render(){
    if(this.state.sendRedirect) {
      return <Redirect push to="/Send" />;
    }
    else if(this.state.recieveRedirect){
      return <Redirect push to="/Recieve" />;
    }
    return (
      <div className="MainContainer">
        <div className="centralPanel">
          <div className="panelContent">
          <h1>Swiftshare.</h1>
            <p >It is the easiest and the fastest way to <br/> send and recieve any type of files</p>
            <div className="lead">
              <div className="Selection">
                <button id="send" className="Selection-button" onClick={this.handleOnClickSend}>
                  Send File
                </button> <br/>
                <button id="recieve" className="Selection-button" onClick={this.handleOnClickRecieve}>
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="imgPanel">
          <img src={require("./image/landing.jpg")} alt="sharing file" className="landingImage"/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));


export default App;