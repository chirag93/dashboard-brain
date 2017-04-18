
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {browserHistory} from 'react-router';
import Api from '../../utils/Api'
var ReactSuperSelect = require('react-super-select');



import 'react-select/dist/react-select.css';




class SubProjectSelect extends Component {
 

constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this)
    this.state = {
      value: '',
      projects : []
     
    };
  }



 onSelect(val) {
  console.log(this.state.projects)
  console.log("Selected: " + val);
  browserHistory.push({pathname:'/editProject',state:{subProject:val.projectAssociated}})
}
 
componentDidMount() {
  this.getContactList();
}


getContactList(){
  var projectEvent = {}
  var projs =[];
   Api.get('/events').then((events) => {
      //   events.forEach(function(event){
      //     if(event.isProjectEvent){
      //         console.log("logging event((((((((((((((((((");
      //         console.log(event.projectAssociated)
      //         projectEvent.value = event.projectAssociated;
      //         projectEvent.label = event.projectAssociated;
      //         console.log(projectEvent)
      //         projs.push(projectEvent);
      //         console.log(projs)

      //     }
          
      // });

     this.setState({projects:events});
     console.log("String ="+this.state.projects);
     console.log(this.state.projects);
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
  { projectAssociated: 'Financial', label: 'Financial' },
  { projectAssociated: 'Main Sector', label: 'Main Sector' },
  { projectAssociated: 'Special Project', label: 'Special Project' },
  { projectAssociated: 'Reform', label: 'Reform' },
  { projectAssociated: 'Cabinet Follow-ups', label: 'cabinet Follow-ups' },
  { projectAssociated: 'Others', label: 'Others' }
];

var ops = ["asdf","asdf","asdfasdf"]

var arr = ["asdf","asdf123"]

    return (
     <div style={{width:350,margin: '0 auto 10px'}} className='text-align: center'>
      <PageHeader>Select Project to Edit</PageHeader>
    <ReactSuperSelect placeholder="Select A Project" 
                  searchPlaceholder="Search Project"
                  multiple={false}
                  searchable={true}
                  onChange={this.onSelect}
                  dataSource={this.state.projects}
                  optionValueKey='projectAssociated'
                  optionLabelKey='projectAssociated' />
   
  </div>
    );
  }
}



export default SubProjectSelect;
