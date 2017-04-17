import React, {Component} from 'react'
import {form,Button} from 'react-bootstrap';
import './login.css'

import {browserHistory} from 'react-router';

class Login extends Component {
  constructor (props) {
    super(props)

    this._login = this._login.bind(this)
  }

  onLogin(){
    browserHistory.push({pathname:'/',state:{keytest:"valueasdfasdfaf"}})
  }

  render () {
    

    return (
      <div style={{paddingLeft:150,flex:1,justifyContent:'space-around',display:'flex',flexDirection:'row'}} className="wrapper">
    <form className="form-signin">       
      <h2 className="form-signin-heading">Please login</h2>
      <div>
      <input type="text" className="form-control" name="username" placeholder="Email Address" autoFocus="" />
       </div> 
       <div style={{paddingTop:20}}>
      <input type="password" className="form-control" name="password" placeholder="Password" />      
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