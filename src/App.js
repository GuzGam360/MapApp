// import Map from "./components/Map";
import { useRef, useState } from "react";
import { Button, Col, Row, Container, Input, Spinner } from 'reactstrap';
import './App.css';
import DesinationTable from "./components/DestinationTable";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: '1300px',
  height: '500px'
};

const center = {
  lat: 25.67145219760651,
  lng: -100.31809720508832
};


function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //MyApiKey
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return <Spinner />
  }


  async function calculateAndAddRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

    console.log('Si esta jalando el Calculate Route')
  }

  console.log(typeof origin);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';

    console.log('Si esta jalando el Clear Route')
  }


  /**RENDER */
  return (
    <div className="App">

      <Container>
        <Row>
          <Col>
            <h1>Map-App</h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={4}>
            <Autocomplete>
              <Input type='text' placeholder="Origen" ref={originRef} />
            </Autocomplete>
            {/* <Button id="Btn" className="Boton" color="primary" size="lg">Ruta</Button> */}
          </Col>

          <Col md={4}>
            <Autocomplete>
              <Input type='text' placeholder="Destino" ref={destinationRef} />
            </Autocomplete>
            {/* <Button id="Btn" className="Boton" color="primary" size="lg">Ruta</Button> */}
          </Col>

          <Col style={{ paddingLeft: 0, paddingRight: 0, }} sm='2' md='2' lg='2'>
            <Button className="Boton" color='secondary' onClick={calculateAndAddRoute}>Calcular y Añadir ruta</Button>
            <Button close title='Limpiar mapa' onClick={clearRoute} />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={3} lg={4}>
            <p>Distancia: {distance}</p>
          </Col>
          <Col md={3} lg={4}>
            <p>Tiempo: {duration}</p>
          </Col>

          <Col sm={2} md={2} lg={2}>
            <Button color="Secondary" outline
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}>Centrar Mapa</Button>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/**COLOCAR AQUI EL RENDER DEL MAPAS */}
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onLoad={map => setMap} options={{ mapTypeControl: false, fullscreenControl: false, streetViewControl: false, zoomControl: false }} >
              { /* Child components, such as markers, info windows, etc. */}
              <Marker position={center} />
            </GoogleMap>
            {/**COLOCAR AQUI EL RENDER DEL MAPAS */}
          </Col>
        </Row>

        <Row>
          <Col sm={2} md={2} lg={2}>
            <h2 style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} md='4'>Destinos</h2>
          </Col>

          <Col style={{ padding: 0 }} >
            <Button color="primary" size="md" style={{ marginTop: 10, marginBottom: 10, }}>Calcular</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <DesinationTable />
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default App;
