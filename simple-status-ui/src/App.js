import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
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
    const body = [
      {
        "name": "Simple Status",
        "url": "http://localhost:8000/healthz",
        "category": "API",
        "description": "A simple status page."
      }
    ];
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    axios.post('http://localhost:8000/status', body, { headers })
      .then(response => this.setState({ results: response.data, dataIsLoaded: true }))
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
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossorigin="anonymous"
          />
          <Container>
            <Row className="justify-content-md-center">
              <h1 style={{marginTop: 50, marginBottom: 50, width: '25rem'}}>Simple Status Page</h1>
            </Row>
            <Row className="justify-content-md-center">
            <Alert variant="success">
              <Alert.Heading>All Systems Operational</Alert.Heading>
            </Alert>
            <Alert variant="danger">
              <Alert.Heading>System Failure</Alert.Heading>
            </Alert>
            </Row>
            <hr />
            <Row className="justify-content-md-center">
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Accordion Item #1: <Badge bg="success">Success</Badge>
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Accordion Item #2: <Badge bg="danger">Danger</Badge>
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
