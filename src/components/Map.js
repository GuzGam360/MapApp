import React from 'react'
import { GoogleMap, useJsApiLoader, Marker,} from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '1300px',
  height: '500px'
};

const center = {
  lat: 25.67145219760651,
  lng: -100.31809720508832
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //MyApiKey
    libraries: ['places'],
  })
  
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount} options={{mapTypeControl: false, fullscreenControl: false, streetViewControl: false, zoomControl: false}} >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={center}/> 
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map; 