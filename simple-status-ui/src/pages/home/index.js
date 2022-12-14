import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import SystemStatus from '../../components/system-status';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000';

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
        "url": `${API_ENDPOINT}/healthz`,
        "category": "API",
        "description": "A simple status page."
      },
      {
        "name": "Simple Status 2",
        "url": `${API_ENDPOINT}/healthz`,
        "category": "API",
        "description": "A simple status page."
      },
      {
        "name": "Simple Status 3",
        "url": `${API_ENDPOINT}/healthz`,
        "category": "API",
        "description": "A simple status page."
      }
    ];
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    axios.post(`${API_ENDPOINT}/status`, body, { headers })
      .then(response => this.setState({ results: response.data, dataIsLoaded: true }))
  }

  render() {
    const { results, dataIsLoaded } = this.state;

    if (!dataIsLoaded) {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <h1 style={{marginTop: 50, marginBottom: 50, width: '25rem'}}>Loading...</h1>
          </Row>
        </Container>
      )
    } else {
      return ( // TODO: make the title into an env var or as part of a settings.yaml in the api
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
                      {item.name}: {
                        item.status === 200 ? <Badge bg="success">Success</Badge> :
                          <Badge bg="danger">Failure</Badge>
                      }
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
