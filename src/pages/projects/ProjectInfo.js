
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var Select = require('react-select');
import {form,Input,Row,Col,FormControl,InputGroup,ControlLabel,FormGroup} from  'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
var ReactSuperSelect = require('react-super-select');



import 'react-select/dist/react-select.css';
class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        this.state = { inputs: ['input-0'] };
    }
handleChange(name,e){
  console.log("logging")
  console.log(name);
  console.log(e)
  console.log(this.state.inputs)
}

componentDidMount() {
  console.log("called component")
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

    render() {
      return(
        <div>
        <PageHeader className='wrapper'>Edit Project</PageHeader>
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

                <InputGroup className='inputDiscription'>
                <div>Notes:</div>
                <FormControl type="text"  componentClass="textarea" onChange={this.handleNotesChange} />
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
              <div style={{flex:1,flexDirection:'column',paddingTop:20,paddingLeft:50}} clssName='wrapper'>
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
