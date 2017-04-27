import React, {Component} from 'react'
import {form,Button} from 'react-bootstrap';
import './login.css'
import Api from '../../utils/Api'

import {browserHistory} from 'react-router';

class Login extends Component {
  constructor (props) {
    super(props)
    this.loginRequest = {}
    this._login = this._login.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handlePasswordInput  = this.handlePasswordInput.bind(this)
    this.onLogin  = this.onLogin.bind(this)
    this.state = {
      email : '',
      password : ''
    };

  }

  onLogin(){
    this.loginRequest.email = this.state.email;
    this.loginRequest.password = this.state.password;
    console.log(this.loginRequest)
    Api.post('/login', this.loginRequest).then(() => 
      {console.log("successfully createed a Event");
      browserHistory.push({pathname:'/',state:{keytest:"valueasdfasdfaf"}})
    }).catch((err) => {
     console.log("Got Error while updating event");
     console.log(err);  
     alert("Login Failed")

   });

}

  handleEmailInput(e){

    this.setState({email:e.target.value});
  }

  handlePasswordInput(e){
    this.setState({password:e.target.value});
  }

  render () {
    

    return (
      <div style={{paddingLeft:150,flex:1,justifyContent:'space-around',display:'flex',flexDirection:'row'}} className="wrapper">
    <form className="form-signin">       
      <h2 className="form-signin-heading">Please login</h2>
      <div>
      <input type="text" className="form-control" name="username" placeholder="Email Address" autoFocus="" onChange={this.handleEmailInput}/>
       </div> 
       <div style={{paddingTop:20}}>
      <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handlePasswordInput}/>      
      </div>
      <div style={{paddingTop:20}}>
      <Button bsStyle="primary" onClick={this.onLogin}className="btn btn-lg btn-primary btn-block">Login</Button>   
      </div>
    </form>
  </div>
    )
  }

  _login (username, password) {
    console.log("on login")
   // this.props.dispatch(loginRequest({username, password}))
  }
}



// Wrap the component to inject dispatch and state into it
export default Login