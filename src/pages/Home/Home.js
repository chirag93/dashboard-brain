import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
import {Nav,NavItem,ControlLabel,FormControl,InputGroup,form,FormGroup} from 'react-bootstrap';
import './Home.css';

class Home extends Component {
 

constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      value: ''
    };
  }


  getInitialState() {
    return {
      value: ''
    };
  }

handleSelect(selectedKey) {
  alert('selected ' + selectedKey);
}



handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleInput(){
    console.log(" logging gsafsdf")
  }

  render () {
    return (
      <div>
      <div className="text-center">
      <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
    <NavItem eventKey={1} href="/home">Create Event</NavItem>
    <NavItem eventKey={2} title="Item">Edit Projects</NavItem>
    
  </Nav>
      <PageHeader>Create A New Event</PageHeader>
        <ControlLabel>Working example with validation</ControlLabel>
        </div>
           <form className='col-md-2 col-md-offset-5 div'>
    
    <FormGroup >
      <InputGroup className='input'>
        <div>Topic:</div>
        <FormControl  type="text" onChange={this.handleInput} />
      </InputGroup>
      <div>
          
      </div>
      <InputGroup className='inputDiscription'>
        <div>Description:</div>
        <FormControl type="text"  componentClass="textarea" onChange={this.handleInput} />
      </InputGroup>
      </FormGroup>
      
      <Button>Test
        </Button>
      </form>
        
        




        <div>User Management</div>
        <div>Bank Account Management</div>
        <div>Analytics</div>
        
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
