
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {browserHistory} from 'react-router';
import Api from '../../utils/Api'



import 'react-select/dist/react-select.css';




class SubProjectSelect extends Component {
 

constructor(props) {
    super(props);
   
    this.state = {
      value: '',
      projects : []
     
    };
  }



 onSelect(val) {
  console.log("Selected: " + val);
  browserHistory.push({pathname:'/editProject',state:{subProject:val}})
}
 
componentDidMount() {
  this.getContactList();
}


getContactList(){
  var projectEvent = {}
  var projs =[];
   Api.get('/events').then((events) => {
        events.forEach(function(event){
          if(event.isProjectEvent){
              console.log("logging event((((((((((((((((((");
              console.log(event.projectAssociated)
              projectEvent.value = event.projectAssociated;
              projectEvent.label = event.projectAssociated;
              projs.push(projectEvent);

          }
          
      });

     this.setState({projects:projs});
     
    }).catch((err) => {
     
      //this.popupError(err.err.message);
    });
}

  getInitialState() {
    return {
      value: ''
    };
  }


render () {
var options = [
  { value: 'Financial', label: 'Financial' },
  { value: 'Main Sector', label: 'Main Sector' },
  { value: 'Special Project', label: 'Special Project' },
  { value: 'Reform', label: 'Reform' },
  { value: 'Cabinet Follow-ups', label: 'cabinet Follow-ups' },
  { value: 'Others', label: 'Others' }
];

var arr = ["asdf","asdf123"]

    return (
     <div style={{width:350,margin: '0 auto 10px'}} className='text-align: center'>
      <PageHeader>Select Project to Edit</PageHeader>
     <Select
  name="form-field-name"
  
  options={this.state.projects}
  onChange={this.onSelect}
/>
   
  </div>
    );
  }
}



export default SubProjectSelect;
