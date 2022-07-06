import Map from "./components/Map";
import { Button, Col, Row, Container, InputGroup, Input } from 'reactstrap';
import './App.css';
import DesinationTable from "./components/DestinationTable";


function App() {
  
  // stylePadding = {
  //   paddingLeft: '0',
  //   paddingRight: '0',
  // }
  
  return (
    <div className="App">

      <Container>
        <Row>
          <Col>
            <h1>Map-App</h1>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputGroup size="lg" md='4'>
              <Input />
              <Button color="primary">Ruta</Button>
            </InputGroup>
            {/* <Button id="Btn" className="Boton" color="primary" size="lg">Ruta</Button> */}
          </Col>

          <Col style={{paddingLeft: 0, paddingRight: 0,}}>
            <Button className="Boton" color='secondary' size='lg'>Añadir</Button>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Map />
          </Col>
        </Row>

        <Row>
          <Col sm={2} md={2} lg={2}>
            <h2 style={{marginTop: 10, marginBottom: 10, marginRight:10}} md='4'>Destinos</h2>
          </Col>

          <Col style={{padding: 0}} >
            <Button color="primary" size="md" style={{marginTop: 10, marginBottom: 10,}}>Calcular</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <DesinationTable/>
          </Col>
        </Row>

      </Container>

    </div>
  );
}

export default App;
