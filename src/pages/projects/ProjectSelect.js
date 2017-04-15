import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');

import 'react-select/dist/react-select.css';




class ProjectSelect extends Component {
 

constructor(props) {
    super(props);
   
    this.state = {
      value: '',
     
    };
  }



 logChange(val) {
  console.log("Selected: " + val);
}
 

  getInitialState() {
    return {
      value: ''
    };
  }


  render () {
var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

var arr = ["asdf","asdf123"]

    return (
     <div style ={{width:350,margin: '0 auto 10px'}} className='text-align: center'>
      <PageHeader>Select Project</PageHeader>
     <Select
  name="form-field-name"
  
  options={options}
  onChange={this.logChange}
/>
   
  </div>
    );
  }
}



export default ProjectSelect;
