import Alert from 'react-bootstrap/Alert';

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

export default SystemStatus;
