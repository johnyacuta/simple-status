import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
      return ( // TODO: make the title into an env var
        <div className = "App">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <Container>
            <Row className="justify-content-md-center" >
              <h1 style={{marginTop: 50, marginBottom: 50, width: '25rem'}}>Simple Status Page</h1>
            </Row>
            <Row>
              {
                results['Services'].map((item) => (
                  <ol key = 'Services'>
                    <li>Service Name: {item.name}</li>
                    <li>Service Response Status Code: {item.status}</li>
                    <li>Service URL: {item.url}</li>
                    <li>Service Category: {item.category}</li>
                    <li>Service Description: {item.description}</li>
                  </ol>
                ))
              }
            </Row>
          </Container>
        </div>
      )
    }
  }
}

export default App;
