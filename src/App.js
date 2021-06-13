import './App.css';
import React  from 'react';
import { Dropdown,Button,Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = () => (
  <div className="wrapper">
  <span>Loading...</span>
</div>
);

export default class fetchingTable extends React.Component{
  
 constructor(props) {
   super(props);

   this.state = {
    data: [],
    filteredData: [],
    loading:true,
    alert:false,
   };
  this.handleChange=this.handleChange.bind(this);
  }
 
  componentDidMount(){
     this.getData();
  }
  
  getData() {
     fetch('https://api.sampleapis.com/codingresources/codingResources')
     .then(results => results.json())
     .then(results => this.setState({data:results,filteredData:results,loading: false}));
     
  }

  refresh(){
  window.location.reload(false);
  }
 

  handleChange = (e) => {
   const {data} = this.state;
   const value = e.target.value;
   const java = JSON.parse(JSON.stringify(data)).filter((data) => data.topics.includes(value));
   this.setState({ filteredData: java});
  };

  render() {
    const {filteredData} = this.state;
    return (
    <div className="parent">
      {this.state.loading ? <Loader/> : null}
      <div className="header">
        <div className="lxr_logo"></div>
        <Dropdown className="dropdown_button">
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
           Topics
        </Dropdown.Toggle>
        <Dropdown.Menu className="content_here">
        <Button className="button_action"onClick={this.handleChange} value="java">Java</Button>
        <Button className="button_action"onClick={this.handleChange} value="css">Css</Button>
        <Button className="button_action"onClick={this.handleChange} value="git">Git</Button>
        <Button className="button_action"onClick={this.handleChange} value="learn to code">Learn to code</Button>
        <Button className="button_action"onClick={this.handleChange} value="javascript">Javascript</Button>
        <Button className="button_action"onClick={this.refresh} value="html">Show all</Button>
        </Dropdown.Menu>
        </Dropdown>
        
        
      </div>
      <div className="table_heads">
        <h1 className="title_heads">Title</h1> 
        <h1 className="for_extra_effects">Topic</h1> 
        <h1 className="for_extra_effects">Level</h1> 
        <h1 className="for_extra_effects"> Format</h1>
      </div>
      
      <div className="table">

      {this.state.filteredData.map(function(filteredData,index){
      return(
        <div>
        <div  className="table_data" onClick={() =>
          {window.alert("Visit this link for more info.." + JSON.stringify(filteredData.url))}
          }>
          <p className="title">{filteredData.description}</p>
          <p className="for_extra_effects">{filteredData.topics.join(", ")}</p>
          <p className="for_extra_effects">{filteredData.levels.join(", ")}</p>
          <p className="for_extra_effects">{filteredData.types.join(", ")}</p>
        </div>
        </div>
        
      )
    }
    )
    }
    </div>
    <div className="footer">Made by: Amrit Singh Dhatt, with ReactJS</div>
    </div>
  );
}
}