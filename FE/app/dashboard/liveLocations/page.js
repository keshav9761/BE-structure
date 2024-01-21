"use client"
import { useEffect, useMemo, useState } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { Button } from '@mui/base';

const NEXT_PUBLIC_GOOGLE_MAPS_KEY = "AIzaSyAICm_Ekln581WV62P1mS1YXW1b38INRpw";
const LiveLocation = () => {
  const ws = new WebSocket('ws://51.21.1.57:9001/echoLocation');
  const [locationI, setLocationI] = useState({ lat: 0, lng: 0 })
  const [centerTheMarker, setCenterTheMarker] = useState({lat: 28.6872974, lng: 77.4822982})

  const libraries = useMemo(() => ['places'], []);
  // const locationI = useMemo(
  //   () => ({ lat: 28.6872974, lng: 77.4822982 }),
  //   []
  // );

  // const locationII = useMemo(
  //   () => ({ lat: 28.6832930, lng: 77.4815930 }),
  //   []
  // );

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  useEffect(() => {

    ws.addEventListener('error', (m) => { console.log("error"); });

    ws.addEventListener('open', (m) => {
      ws.send('Web App Connected')
      console.log("websocket connection open");
    });

    ws.addEventListener('message', (m) => {
      const latLng = JSON.parse(m.data || {});
      const parselatLng = JSON.parse(latLng);
      console.log(parselatLng)
      setLocationI({lat: parselatLng.lat, lng: parselatLng.lng});
    });

  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });

  const handleCenterTheMarker = () => {
    setCenterTheMarker(locationI)
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={centerTheMarker}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '800px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        <MarkerF position={locationI} label="Keshav" onLoad={() => console.log('Marker Loaded')} />
        {/* <MarkerF position={locationII} label="Shivam" onLoad={() => console.log('Marker Loaded')} /> */}
      </GoogleMap>
      <br />
      <br />
      <Button type='primary' onClick={handleCenterTheMarker}> Center The Marker </Button>
    </div>
  );
};

export default LiveLocation;