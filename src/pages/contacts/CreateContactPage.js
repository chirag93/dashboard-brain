 /* eslint-disable */
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
import {Nav,NavItem,ControlLabel,FormControl,InputGroup,form,FormGroup,Row,Col,Input} from 'react-bootstrap';
var ReactSuperSelect = require('react-super-select');
var DatePicker = require("react-bootstrap-date-picker");
import {browserHistory} from 'react-router';


import './Home.css';
import Api from '../../utils/Api'

let contacts = [];

class CreateContactPage extends Component {
 

constructor(props) {
    super(props);
    this.createContactBody = {}
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handlePhoneInput = this.handlePhoneInput.bind(this)
    this.handleMailInput = this.handleMailInput.bind(this)
    this.createEvent  = this.createEvent.bind(this)
    this.state = {
     name:'',
     phone:'',
     email:''
    };
  }







createEvent(){
  console.log(this.state.topic)
  if(this.state.topic!=undefined && this.state.topic!=''&& this.state.topic!=null){
    this.createContactBody.topic = this.state.topic;
    this.createContactBody.description = this.state.description;
    this.createContactBody.date  = this.state.date;
    this.createContactBody.users = this.state.selectedContacts;
    console.log("logging create Event Body ");
    console.log(this.createContactBody);
    Api.post('/createEvent/', this.createContactBody).then(() => {console.log("successfully createed a Event");alert("Event Has been succeessfully created "); window.location.reload()}).catch((err) => {
     console.log("Got Error while updating event");
     alert("Unable to Create the Contact Check the Fields")
     console.log(err);  
   });
  }else{
    alert("Topic Field Cannot Be Blank")
  }
}


  

  handleNameInput(e){
    
    this.setState({name:e.target.value})
   
  }

   handleMailInput(e){
    this.setState({email:e.target.value})
  }

  handlePhoneInput(e){
    this.setState({phone:e.target.value})
  }

 


  render () {

    return (
      <div>
      <div className="App">
    
      <PageHeader>Create A New Contact</PageHeader>
        
        </div>
           
          <div style={{"paddingTop":50}}>
           <form style={{paddingLeft:150}}>
    
    <FormGroup >
      <InputGroup className='input'>
        <div>Name:</div>
        <FormControl  type="text" onChange={this.handleNameInput} />
      </InputGroup>
     
      <InputGroup className='inputDiscription'>
        <div>e-mail:</div>
        <FormControl type="text"  componentClass="textarea" onChange={this.handleMailInput} />
      </InputGroup>
       
      <InputGroup className='inputDiscription'>
        <div>phone</div>
        <FormControl type="text"  componentClass="textarea" onChange={this.handlePhoneInput} />
      </InputGroup>
      

        </FormGroup>
    
      <Button bsSize="large" bsStyle="primary" block style={{maxWidth:340}} onClick={this.createEvent}> Submit 
        </Button>
      
      </form>
      </div>
 
      </div>
    );
  }
}


export default CreateContactPage;
