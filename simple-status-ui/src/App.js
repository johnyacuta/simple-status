import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      dataIsLoaded: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/status', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          [
            {
              "name": "Simple Status",
              "url": "http://localhost:8000/healthz",
              "category": "API",
              "description": "A simple status page."
            }
          ]
        )
      }
    ) // TODO: make the url into an env var
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // Print
      this.setState({
        results: json,
        dataIsLoaded: true
      })
    })
  }

  render() {
    const { results, dataIsLoaded } = this.state;

    if (!dataIsLoaded) {
      return (
        <div>
          <h1>Fetching data. Please wait...</h1>
        </div>
      )
    } else {
      console.log(results); // Print
      return (
        <div>
          <h1>Fetched data from an api in react</h1>
        </div>
      )
    }
  }
}

export default App;
