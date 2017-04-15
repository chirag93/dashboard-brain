import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')





class MainProjects extends Component {
 

constructor(props) {
    super(props);
   
    this.state = {
      value: '',
     
    };
  }


 

  getInitialState() {
    return {
      value: ''
    };
  }


  render () {


    return (
     <div className="well" style={{maxWidth: 400, margin: '0 auto 10px',display:'flex',flex:1,flexDirection:'column',justifyContent:'space-around'}}>
    <Button  bsStyle="primary" bsSize="large" >Financial </Button>
    <Button bsSize="large" block>Main Sector</Button>
    <Button bsStyle="primary" bsSize="large" >Reform</Button>
    <Button bsSize="large" block>Special Projects</Button>
    <Button bsStyle="primary" bsSize="large" >Cabinet Follow ups</Button>
    <Button bsSize="large" block>Others</Button>
   
  </div>
    );
  }
}



export default MainProjects;
