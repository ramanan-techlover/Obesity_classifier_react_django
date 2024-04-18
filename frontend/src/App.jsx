import './App.css'
import React, { Component } from "react";
import axios from "axios";

class App extends Component{
  state = {
    Age: "",
    Gender: "",
    Height: "",
    Weight: "",
    BMI: "",
    predict: null,
    error: null,
  };
  handleChanges = (e) =>{
    this.setState({
      [e.target.name]:e.target.value,
    });
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    const{Age, Gender, Height, Weight, BMI} = this.state;
    axios.post("http://127.0.0.1:8000/api/predict/", {
      Age: Age,
      Gender: Gender,
      Height: Height,
      Weight: Weight,
      BMI: BMI
    })
    .then((response) => {
      this.setState({predict: response.data.predict, error: null});
    })
  };
  render(){
    const {Age, Gender, Height, Weight, BMI, predict , error} = this.state;
    return(
      <div>
        <h1>Obesity Classifier</h1>
        <form onSubmit={this.handleSubmit}>
        <div>
          <input className="input" placeholder="Age" value={Age} onChange={this.handleChanges} required type="number" name="Age" />
        </div>

        <div>
          <input className='input' placeholder='Gender(female:0&male:1)' value={Gender} onChange={this.handleChanges} required type="number" name='Gender'/>
        </div>

        <div>
          <input className="input" placeholder="Height" value={Height} onChange={this.handleChanges} required type="number" name="Height" />
        </div>

        <div>
          <input className="input" placeholder="Weight" value={Weight} onChange={this.handleChanges} required type="number" name="Weight" />
        </div>

        <div>
          <input className="input" placeholder="BMI" value={BMI} onChange={this.handleChanges} type="number" required name="BMI" />
        </div>

        <div>
        <button type='submit'>Submit</button>
        </div>
        </form>
        {predict !== null && (
          <div>
            <h2>You are </h2>
            <h2>{predict}</h2>
          </div>
        )}
        {error &&<div>Error:{error}</div>}
      </div>
    );
  }
}

export default App
