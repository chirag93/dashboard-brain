 /* eslint-disable */
import React, {Component} from 'react';
var Button = require('react-bootstrap/lib/Button')
var PageHeader = require('react-bootstrap/lib/PageHeader')
import {Nav,NavItem,ControlLabel,FormControl,InputGroup,form,FormGroup,Row,Col,Input} from 'react-bootstrap';
var ReactSuperSelect = require('react-super-select');
var DatePicker = require("react-bootstrap-date-picker");
import {browserHistory} from 'react-router';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import ReactD3 from 'react-d3';
import localImage from '../../assets/brain.png';
import BackgroundImage from 'react-background-image-loader';
import { Graph } from 'react-d3-graph';


var ScatterChart = ReactD3.ScatterChart;
var LineChart1 = ReactD3.LineChart;



import './Home.css';
import './react-super-select.css'
import Api from '../../utils/Api'

let contacts = [];
let axisArray1 = [];
 let axisArray2 = [];
 let axisArray3 = [];
 let axisArray4= [];
 let axisArray5 = [];
class Home extends Component {
 

constructor(props) {
    super(props);
    this.createEventBody = {}
    this.handleXInput = this.handleXInput.bind(this)
    this.handleYInput = this.handleYInput.bind(this)
    this.getContactList = this.getContactList.bind(this)
    this.handleChannelInput = this.handleChannelInput.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    // this.handleTopicInput = this.handleTopicInput.bind(this)
    // this.contactHandler = this.contactHandler.bind(this)
    // this.selectedItemsTemplate = this.selectedItemsTemplate.bind(this)
    // this.handleDateChange = this.handleDateChange.bind(this)
    // this.handleDescriptionInput = this.handleDescriptionInput.bind(this)
   // this.createEvent  = this.createEvent.bind(this)
    this.state = {
      value: '',
      topic:'',
      description:'',
      date : new Date().toISOString(),
      inputs : [],
      contacts : [],
      selectedContacts: [],
      finalAxisArray1:[{x:1,y:2}],
      finalAxisArray2:[{x:1,y:2}],
      finalAxisArray3:[{x:1,y:2}],
      finalAxisArray4:[{x:1,y:2}],
      finalAxisArray5:[{x:1,y:2}],
      X: '',
      Y: '',
      ch_data:[]
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

  




getContactList(){
 // var axisArray = [];
 
   
   Api.get('/api/tasks/'+this.state.X+'/'+this.state.Y+'/?channels='+this.state.channels).then((ll) => {
      console.log("logging tdata=======");
      var modifiedMax = [];
       var inc = 1;
      if(this.state.Y>=1200){
       inc = 5;
      }
      console.log("logging sadfa");
      console.log(modifiedMax);
     
      
       
      var len = ll.X.length;
      
      for(var i=0;i<len;i=i+inc){
        var obj1 = new Object();
        var obj2 = new Object();
        var obj3 = new Object();
        var obj4 = new Object();
        var obj5 = new Object();
        
        obj1.x= ll.X[i]
        obj1.y=ll.Y[0][i]
        axisArray1.push(obj1)
      
        obj2.x= ll.X[i]
        obj2.y=ll.Y[1][i]
        axisArray2.push(obj2)

        obj3.x= ll.X[i]
        obj3.y=ll.Y[2][i]
        axisArray3.push(obj3)

        obj4.x= ll.X[i]
        obj4.y=ll.Y[3][i]
        axisArray4.push(obj4)

        obj5.x= ll.X[i]
        obj5.y=ll.Y[4][i]
        axisArray5.push(obj5)

      }

      //var ch= this.state.channels.split("");
      
      

      var b = this.state.channels.split(',').map(function(item) {
    return parseInt(item, 10);
    });
      this.setState({ch_data:b})


      

      this.setState({finalAxisArray1:axisArray1})
      this.setState({finalAxisArray2:axisArray2})
      this.setState({finalAxisArray3:axisArray3})
      this.setState({finalAxisArray4:axisArray4})
      this.setState({finalAxisArray5:axisArray5})
     
     
    }).catch((err) => {
      console.log("Error in getting event: "+err);
      console.log(err);
      //this.popupError(err.err.message);
    });
}



handleXInput(e){
    
    this.setState({X:e.target.value})
   
  }

   handleYInput(e){
    this.setState({Y:e.target.value})
  }

 handleChannelInput(e){
  this.setState({channels:e.target.value})
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




//var closeButton = <Button onClick={this.removeSymptomField()}>Close</Button>;
closeButton (){
  return <Button onClick={this.removeSymptomField()}>Close</Button>
}


  render () {

    const data1 = [
            {                 
                name : this.state.ch_data[0],
                values: this.state.finalAxisArray1
            },


        ];
        const data2 = [
            {                 
                name: this.state.ch_data[1],
                values: this.state.finalAxisArray2
            }
        ];
        const data3 = [
            {                 
                name: this.state.ch_data[2],
                values: this.state.finalAxisArray3
            }
        ];
        const data4 = [
            {                 
                name: this.state.ch_data[3],
                values: this.state.finalAxisArray4
            }
        ];
        const data5 = [
            {                 
                name: this.state.ch_data[4],
                values: this.state.finalAxisArray5
            }
        ];
        const data11 = [
            {                 
                name: "steelblue1", 
                values: this.state.finalAxisArray1
            },
            {                 
                name: "steelblue2", 
                values: this.state.finalAxisArray2
            },
            {                 
                name: "steelblue3", 
                values: this.state.finalAxisArray3
            },
            {                 
                name: "steelblue4", 
                values: this.state.finalAxisArray4
            },
            {                 
                name: "steelblue", 
                values: this.state.finalAxisArray5
            }
        ];

        const lineData = [
          {
            name: "series1",
            values: this.state.finalAxisArray1
          },
          ];

        const tree = {
    nodes: [
      {id: 'Harry'},
      {id: 'Sally'},
      {id: 'Alice'}
    ],
    links: [
        {source: 'Harry', target: 'Sally'},
        {source: 'Harry', target: 'Alice'},
    ]
};

const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 120,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

       


    return (
      <div>
      <div className="App">
     
    

     <FormGroup >
     <InputGroup className='input' >
        <div>Channels:</div>
        <FormControl  type="text" onChange={this.handleChannelInput}/>
      </InputGroup>
      <InputGroup className='input'>
        <div>Min:</div>
        <FormControl  type="text" onChange={this.handleXInput} />
      </InputGroup>
     
      <InputGroup className='input'>
        <div>Max:</div>
        <FormControl type="text"  onChange={this.handleYInput} />
      </InputGroup>
      </FormGroup>
       <Button bsSize="large" bsStyle="primary" block style={{maxWidth:340,paddingLeft:50}} onClick={this.getContactList}> Submit 
        </Button>
    

<div className='graph' style={{marginLeft:350}}>
            <LineChart1
              legend={true}
              data={data1}
              width={750}
              height={300}
              title="Chart 1"
            />
          </div>
 <div className='graph' style={{marginLeft:350}}>
            <LineChart1
              legend={true}
              data={data2}
              width={750}
              height={300}
              title="Chart 2"
            />
          </div>

   <div className='graph' style={{marginLeft:350}}>
            <LineChart1
              legend={true}
              data={data3}
              width={750}
              height={300}
              title="Chart 3"
            />
          </div>                  
                    

 <div className='graph' style={{marginLeft:350}}>
            <LineChart1
              legend={true}
              data={data4}
              width={750}
              height={300}
              title="Chart 4"
            />
          </div>

        <div className='graph' style={{marginLeft:350}}>
            <LineChart1
              legend={true}
              data={data5}
              width={750}
              height={300}
              title="Chart 5"
            />
          </div>
                

                  <div className='background' style={{paddingTop:50}}>
                  
                    <ScatterChart
              data={data11} width={750} height={400} title="Scatter Chart" shapeColor={"red"} domain={{x:[-15,], y:[-15,]}}
              
              /></div>      


        </div>


           
          <div style={{"paddingTop":50}}>
           <form style={{paddingLeft:150}}>
      

     
      
      </form>
      </div>
 
      </div>
    );
  }
}


export default Home;
