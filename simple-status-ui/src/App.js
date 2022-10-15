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
    fetch('http://localhost:8000/healthz', {
        method: 'GET'
      }
    ) // TODO: make the url into an env var
    .then((res) => res.json())
    .then((json) => {
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
      return (
        <div>
          <h1>Fetched data from an api in react</h1>
        </div>
      )
    }
  }
}

export default App;
