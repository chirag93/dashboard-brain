 /* eslint-disable */
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
import {Nav,NavItem,ControlLabel,FormControl,InputGroup,form,FormGroup,Row,Col,Input} from 'react-bootstrap';
var ReactSuperSelect = require('react-super-select');
var DatePicker = require("react-bootstrap-date-picker");
import {browserHistory} from 'react-router';


import './Home.css';
import './react-super-select.css'
import Api from '../../utils/Api'

let contacts = [];

class Home extends Component {
 

constructor(props) {
    super(props);
    this.createEventBody = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleTopicInput = this.handleTopicInput.bind(this)
    this.contactHandler = this.contactHandler.bind(this)
    this.selectedItemsTemplate = this.selectedItemsTemplate.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this)
    this.createEvent  = this.createEvent.bind(this)
    this.state = {
      value: '',
      topic:'',
      description:'',
      date : new Date().toISOString(),
      inputs : [],
      contacts : [],
      selectedContacts: []
    };
  }


 

  getInitialState() {
    return {
      value: ''
    };
  }

  handleSelect(selectedKey) {
    console.log("selecte dKEYASDFADFS======",selectedKey)
    if(selectedKey===2){
      browserHistory.push('/select-subProject')
    }
    if(selectedKey===3){
      browserHistory.push('/selectMain')
    }
  }

componentDidMount() {
  console.log("logging props and state ========================");
  console.log(this.state)
  
 // this.isLoggedIn()
  this.getContactList();
}



getContactList(){
  var contacts = [];
   Api.get('/contactList').then((contacts) => {
      
      this.setState({contacts:contacts})
      console.log('logging contacts state ======');
      console.log(this.state.contacts);
     
    }).catch((err) => {
      console.log("Error in getting event: "+err);
      console.log(err);
      //this.popupError(err.err.message);
    });
}

createEvent(){
  console.log(this.state.topic)
  if(this.state.topic!=undefined && this.state.topic!=''&& this.state.topic!=null){
    this.createEventBody.topic = this.state.topic;
    this.createEventBody.description = this.state.description;
    this.createEventBody.date  = this.state.date;
    this.createEventBody.users = this.state.selectedContacts;
    console.log("logging create Event Body ");
    console.log(this.createEventBody);
    Api.post('/createEvent/', this.createEventBody).then(() => {console.log("successfully createed a Event");alert("Event Has been succeessfully created "); window.location.reload()}).catch((err) => {
     console.log("Got Error while updating event");
     console.log(err);  
   });
  }else{
    alert("Topic Field Cannot Be Blank")
  }
}


handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleTopicInput(e){
    console.log(this.state) 
    this.setState({topic:e.target.value})
   
  }

   handleDescriptionInput(e){
    this.setState({topic:e.target.value})
  }

  handleDateChange(value, formattedValue){
      console.log(value)
      this.setState({date:value}) 
    }

 selectedItemsTemplate(controlSelectedValue) {
  if (console && console.info) {
    console.info('selected value: (%s)', controlSelectedValue);
  }

  return(
    <div>
      {controlSelectedValue.length} item(s) selected
    </div>);
};


 contactHandler(item) {
  var cts = [];
  
  item.forEach(function(contact){
      cts.push(contact.id);
      
  });
  this.setState({selectedContacts:cts});
  
};

//var closeButton = <Button onClick={this.removeSymptomField()}>Close</Button>;
closeButton (){
  return <Button onClick={this.removeSymptomField()}>Close</Button>
}

renderInputs() {
   return this.state.inputs.map((input, index) => <Input key={index} type="text" buttonAfter={this.closeButton()} placeholder="Type a symptom here."/>)
}

  render () {



    return (
      <div>
      <div className="App">
      <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
    <NavItem eventKey={1} href="/home">Create Event</NavItem>
    <NavItem eventKey={2} title="Item">Edit Projects</NavItem>
     <NavItem eventKey={3} title="Item">Create Project</NavItem>
    
  </Nav>
      <PageHeader>Create A New Event</PageHeader>
        
        </div>
           
          <div style={{"paddingTop":50}}>
           <form style={{paddingLeft:150}}>
    
    <FormGroup >
      <InputGroup className='input'>
        <div>Topic:</div>
        <FormControl  type="text" onChange={this.handleTopicInput} />
      </InputGroup>
     
      <InputGroup className='inputDiscription'>
        <div>Description:</div>
        <FormControl type="text"  componentClass="textarea" onChange={this.handleDescriptionInput} />
      </InputGroup>
       <div style={{"paddingTop":50}}>Select Contact:</div>
       <div style={{maxWidth:340}}>
       <ReactSuperSelect placeholder="Select A Contact" 
                  searchPlaceholder="Search Contact"
                  multiple={true}
                  searchable={true}
                  onChange={this.contactHandler}
                  dataSource={this.state.contacts} />
                        
      </div>
         <ControlLabel style={{'paddingTop':100}}>Select Date:</ControlLabel>
          <div style={{maxWidth:340}}>
         <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange} />
         </div>

       

<div className="input">
   {this.renderInputs()}
</div>
      </FormGroup>
      

      <Button bsSize="large" bsStyle="primary" block style={{maxWidth:340}} onClick={this.createEvent}> Submit 
        </Button>
      
      </form>
      </div>
        
        




       
        
      </div>
    );
  }
}

// Analytics -
// No of Transactions per year, month , week , day
// No of Active Users per year, month , week , day
// No of Scratch cards user per year , month ,week ,day
// No of Scratch cards generated per year , month, week ,day
// Total amount in Ewallet
// Generic DB Browser

export default Home;
