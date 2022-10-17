import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

function SystemStatus(results) {
  var systemsOperational = true;
  for(let r of results['results']['Services']) {
    if(r.status !== 200) {
      systemsOperational = false;
      break;
    }
  }

  return systemsOperational === true ?
    <Alert variant="success">
      <Alert.Heading>All Systems Operational</Alert.Heading>
    </Alert>
    :
    <Alert variant="danger">
      <Alert.Heading>System Failure</Alert.Heading>
    </Alert>;
}

class Home extends Component {
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
        "name": "Simple Status 1",
        "url": "http://localhost:8000/healthz",
        "category": "API",
        "description": "A simple status page."
      },
      {
        "name": "Simple Status 2",
        "url": "http://localhost:8000/healthz",
        "category": "API",
        "description": "A simple status page."
      },
      {
        "name": "Simple Status 3",
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
      // console.log(results); // Print
      return ( // TODO: make the title into an env var
        <Container>
          <Row className="justify-content-md-center">
            <h1 style={{marginTop: 50, marginBottom: 50, width: '25rem'}}>Simple Status Page</h1>
          </Row>
          <Row>
            <SystemStatus results={results} />
          </Row>
          <hr />
          <Row>
            <Accordion alwaysOpen>
              {
                results['Services'].map((item, index) => (
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      {item.name}: { item.status === 200 ? <Badge bg="success">Success</Badge> : <Badge bg="danger">Failure</Badge> }
                    </Accordion.Header>
                    <Accordion.Body>
                      <div title='content'>
                        <ul key='Services'>
                          <li>Name: {item.name}</li>
                          <li>Response Status Code: {item.status}</li>
                          <li>URL: {item.url}</li>
                          <li>Category: {item.category}</li>
                          <li>Description: {item.description}</li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))
              }
            </Accordion>
          </Row>
        </Container>
      )
    }
  }
}

export default Home;
