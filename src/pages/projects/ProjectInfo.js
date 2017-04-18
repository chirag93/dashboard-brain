 /* eslint-disable */
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {form,Input,Row,Col,FormControl,InputGroup,ControlLabel,FormGroup} from  'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
var ReactSuperSelect = require('react-super-select');
import Api from '../../utils/Api'



import 'react-select/dist/react-select.css';
class MultipleChoice extends Component {
    constructor(props) {
        super(props);

        this.handleTopicInput = this.handleTopicInput.bind(this)
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleNoteInput = this.handleNoteInput.bind(this)
        this.contactHandler = this.contactHandler.bind(this)
        this.state = { 
          inputs: ['input-0'],
          projectDetails: {},
          topic : '',
          description:'',
          contacts:[],
          selectedContacts:[],
          date : new Date().toISOString()
         };

    }

handleChange(name,e){
  console.log("logging")
  console.log(name);
  console.log(e)
  console.log(this.state.inputs)
}

componentDidMount() {
  console.log("called component //////////")
  console.log(this.props)
 
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

getProjectInfo(){
    Api.get('/projectEvents/ewallet').then((events) => {
        console.log("logging event");
     
        console.log(events);
        //this.setState({topic:events.topic})
        this.setState({projectDetails:events});
        this.setState({topic:events.topic});
        this.setState({description:events.description});
        console.log(events.date)
      if(events.date!=null || events.date!=undefined){
          
        var dt  =  events.date.toISOString();
        this.setState({date:dt});
      }
       //  contacts =  this.state.events.personResponsible.split();
    
      
    }).catch((err) => {
      console.log("Error in getting event: "+err);
      //this.popupError(err.err.message);
    });
  }

  
 handleTopicInput(e){
    
    this.setState({topic:e.target.value})
  //  this.setState({projectDetails.topic:e.target.value})
   
  }

   handleDescriptionInput(e){
    this.setState({topic:e.target.value})
  }

  handleNoteInput(e){
    this.setState({topic:e.target.value})
  }


  handleDateChange(value, formattedValue){
      console.log(value)
      this.setState({date:value}) 
    }

    contactHandler(item) {
      var cts = [];

      item.forEach(function(contact){
        cts.push(contact.id);

      });
      this.setState({selectedContacts:cts});

    };

   createEvent(){
  console.log(this.state.topic)
  if(this.state.topic!=undefined && this.state.topic!=''&& this.state.topic!=null){
    this.createEventBody.topic = this.state.topic;
    this.createEventBody.description = this.state.description;
    this.createEventBody.date  = this.state.date;
    this.createEventBody.users = this.state.selectedContacts;
    this.createEventBody.isProjectEvent = true;
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

    render() {
      return(
        <div>
        <PageHeader className='wrapper'>Create Project Under {this.props.location.state.mainProject}</PageHeader>
          <form style={{paddingLeft:150}}>
              <FormGroup >
                <InputGroup className='input'>
                <div>Topic:</div>
                <FormControl ref="text" key={this.state.topic ? 'notLoadedYet' : 'loaded'} onChange={this.handleTopicInput} defaultValue={this.state.topic} />

                </InputGroup>

                <InputGroup className='inputDiscription'>
                <div>Description:</div>
                
                <FormControl ref="text" componentClass="textarea" key={this.state.description ? 'notLoadedYet' : 'loaded'} onChange={this.handleTopicInput} defaultValue={this.state.description} />
                </InputGroup>

                <InputGroup className='inputDiscription'>
                <div>Notes:</div>
                 <FormControl ref="text" componentClass="textarea" key={this.state.notes ? 'notLoadedYet' : 'loaded'} onChange={this.handleNoteInput} defaultValue={this.state.notes} />
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

              <div  style={{paddingTop:50}} >
              {this.state.inputs.map(input => <Row>
               <Col xs={12} sm={3} md={2} lg={1}>
               <div >
               <div >File Name:</div>
               <input  onChange={this.handleChange.bind(this,input)}  >
               </input>  </div></Col>

               <Col xs={6} sm={6} md={8} lg={10}> 
               <div>File Link  :</div>
               <input style ={{width:350}} className='text-align: center' >
               </input></Col>

               </Row>)}
              </div>
              <div style={{flex:1,flexDirection:'column',paddingTop:20,paddingLeft:50}} className='wrapper'>
              <Button onClick={ () => this.appendInput() }>
              Add New File
              </Button>
              </div>
              </FormGroup>
          </form>

        </div>
        );
    }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
    }

    removeInput() {
        console.log(this.state.inputs)
        var newInput = `input-${this.state.inputs.length}`;
        var index = this.state.inputs.indexOf(newInput);
        var updated = this.state.inputs.splice(index,1);
        console.log(newInput)
        console.log("in the updated map")
        console.log(updated);
        this.setState({ inputs: updated });
        console.log("after removing ");
        console.log(this.state.inputs);

    }
}

export default MultipleChoice;
