import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {browserHistory} from 'react-router';


import 'react-select/dist/react-select.css';




class MainProjectSelect extends Component {
 

constructor(props) {
    super(props);
   
    this.state = {
      value: '',
     
    };
  }



 onSelect(val) {
  console.log("Selected: " + val);
  browserHistory.push({pathname:'/project',state:{mainProject:val}})
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
      <PageHeader>Select Main Project</PageHeader>
     <Select
  name="form-field-name"
  
  options={options}
  onChange={this.onSelect}
/>
   
  </div>
    );
  }
}



export default MainProjectSelect;
