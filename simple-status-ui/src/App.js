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
        method: 'GET',
        // mode: 'no-cors'
        header: {
          'Access-Control-Allow-Origin': 'http://localhost:8000'
        }
      }
    ) // TODO: make the url into an env var
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
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
      console.log(results)
      return (
        <div>
          <h1>Fetched data from an api in react</h1>
        </div>
      )
    }
  }
}

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }

export default App;
