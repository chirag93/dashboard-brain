
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {form,Input,Row,Col,FormControl,InputGroup,ControlLabel,FormGroup} from  'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
var ReactSuperSelect = require('react-super-select');
import Api from '../../utils/Api'
import './edit.css';
import LoadingButton from 'react-bootstrap-button-loader';


import 'react-select/dist/react-select.css';
 let namesArr = []
class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.handleTopicInput = this.handleTopicInput.bind(this)
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleNoteInput = this.handleNoteInput.bind(this)
        this.contactHandler = this.contactHandler.bind(this)
        this.handleFileNameChange = this.handleFileNameChange.bind(this)
        this.handleSubmit =  this.handleSubmit.bind(this)
        this.handleFileLinkChange = this.handleFileLinkChange.bind(this)
        this.onMinistrySelect = this.onMinistrySelect.bind(this)
        
        this.createEventBody = {}
        this.fileDetails = {}
        this.state = { 
          inputs: ['input-0'],
          projectDetails: {},
          topic : '',
          description:'',
          notes: '',
          cloneTopicName :'', 
          fileName:'',
          fileLink :'',
          contacts:[],
          selectedContacts:[],
          loading:false,
          files:[],
          fileName: [],
          ministry:'',
          date : new Date().toISOString(),
         
         };

    }

h

componentDidMount() {
  console.log("called component //////////")
  console.log(this.props)
 
  this.getContactList();
  this.getFileList();
  
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

resetState() {
        this.setState({});
    }

getFileList(){
  var fileNames = [];
   Api.get('/files/'+this.props.location.state.subProject).then((files) => {
      
      files.forEach(function(file){
          fileNames.push(file.name);
      })
      this.setState({files:fileNames})

      console.log('logging contacts state ======');
      console.log(this.state.files);
     
    }).catch((err) => {
      console.log("Error in getting event: "+err);
      console.log(err);
      //this.popupError(err.err.message);
    });
}

handleSubmit(){
  console.log("calling handle submit ===")
  this.state.inputs.map(input => {
    console.log("input value ====",input)
  });

  console.log(this.state.fileArr)
  
}



  handleAddFile(){
    this.setState({loading:true});
  }

  handleFileSubmit(){
      this.fileDetails.name = this.state.fileName
      this.fileDetails.url =  this.state.fileLink
      this.fileDetails.subProject =  this.props.location.state.subProject
      Api.post('/createFile', this.fileDetails).then(() => {console.log("successfully createed a Event");alert("Successfully Added the file to this project ");
        this.setState({fileName:''});
        this.setState({fileLink:''});
        this.setState({files:this.state.files.concat([this.fileDetails.name])})
       }).catch((err) => {
     console.log("Got Error while updating file");
     console.log(err);  
   });
  }
  
 handleTopicInput(e){
    
    this.setState({topic:e.target.value})
  //  this.setState({projectDetails.topic:e.target.value})
   
  }

   handleDescriptionInput(e){
    this.setState({description:e.target.value})
  }

  handleNoteInput(e){
    this.setState({notes:e.target.value})
  }

  onMinistrySelect(item){
      this.setState({ministry:item.value});
  }


  handleDateChange(value, formattedValue){
      console.log(value)
      this.setState({date:value}) 
    }

    handleFileNameChange(e){
      this.setState({fileName:e.target.value});
    }

    handleFileLinkChange(e){
      this.setState({fileLink:e.target.value});
    }

    contactHandler(item) {
      var cts = [];

     item.forEach(function(contact){
        cts.push(contact.id);

      });
      this.setState({selectedContacts:cts});

    };

  editEvent(){
    console.log(this.state.topic)
  if(this.state.topic!=undefined && this.state.topic!=''&& this.state.topic!=null){
    this.createEventBody.topic = this.state.topic;
    this.createEventBody.description = this.state.description;
    this.createEventBody.date  = this.state.date;
    this.createEventBody.users = this.state.selectedContacts;
    this.createEventBody.isProjectEvent = true;
    this.createEventBody.notes = this.state.notes;
    this.createEventBody.isProjectEvent =  true;
    this.createEventBody.ministry = this.state.ministry;
    this.createEventBody.mainProject = this.props.location.state.mainProject;
    this.createEventBody.projectAssociated = this.state.topic;
    console.log("logging create Event Body ");
    console.log(this.createEventBody);
    Api.post('/createEvent', this.createEventBody).then(() => {console.log("successfully createed a Event");alert("Event Has been succeessfully created "); window.location.reload(); this.resetState()}).catch((err) => {
     console.log("Got Error while updating event");
     console.log(err);  
   });
  }else{
    alert("Topic Field Cannot Be Blank")
  }
}

    render() {

      var ministryList = [
  { value: 'Finance', label: 'Finance' },
  { value: 'Justice', label: 'Justice' },
  { value: 'Tourism', label: 'Tourism' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Foreign Affairs', label: 'Foreign Affairs' },
  { value: 'Others', label: 'Others' }
];
      return(
        <div>
        <PageHeader className='wrapper'>Create Project under {this.props.location.state.mainProject}</PageHeader>
          <form style={{paddingLeft:150}}>
              <FormGroup >
                <InputGroup className='input'>
                <div>Topic:</div>
                <FormControl ref="text" key={this.state.topic ? 'notLoadedYet' : 'loaded'} onChange={this.handleTopicInput} defaultValue={this.state.topic} />

                </InputGroup>

                <InputGroup className='inputDiscription'>
                <div>Description:</div>
                
                <FormControl ref="text" componentClass="textarea" key={this.state.description ? 'notLoadedYet' : 'loaded'} onChange={this.handleDescriptionInput} defaultValue={this.state.description} />
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

               <div style={{"paddingTop":50}}>Select Ministry:</div>
              <div style={{maxWidth:340}}>
              <ReactSuperSelect placeholder="Select A Ministry" 
              searchPlaceholder="Search ministry"
              multiple={false}
              searchable={true}
              onChange={this.onMinistrySelect}
              dataSource={ministryList} 
              optionValueKey='value'
              optionLabelKey='label'/>

              </div>
              
              <ControlLabel style={{'paddingTop':100}}>Select Date:</ControlLabel>
              <div style={{maxWidth:340}}>
              <DatePicker id="example-datepicker" value={this.state.date} onChange={this.handleDateChange} />
              </div>

            

            <div style={{paddingTop:50}}> 
             <div className='well' >
             <ControlLabel >Addd New File:</ControlLabel>
             <InputGroup className='input'>
                <div>File Name:</div>
                <FormControl   ref="text"  key={this.state.fileName ? 'notLoadedYet' : 'loaded'} onChange={this.handleFileNameChange} defaultValue={this.state.fileName}  />
                </InputGroup>

                <InputGroup className='input'>
                <div>File Link:</div>
                <FormControl ref="text"  key={this.state.fileLink ? 'notLoadedYet' : 'loaded'}  onChange={this.handleFileLinkChange} defaultValue={this.state.fileLink} />
                </InputGroup>

                <div style={{flex:1,flexDirection:'column',paddingTop:20}} >
                <Button bsStyle="primary"  onClick={ () => this.handleFileSubmit() }>
                 Submit File
                </Button>
                </div>
             </div>
             </div>

              </FormGroup>
          </form>
              <div className="well" style={{maxWidth: 400, margin: '0 auto 10px',display:'flex',flex:1,flexDirection:'column',justifyContent:'space-around'}}>
              <Button bsStyle="primary" bsSize="large" className='submit' onClick={ () => this.editEvent() }>
              Submit
              </Button>
              </div>
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

export default CreateProject;
