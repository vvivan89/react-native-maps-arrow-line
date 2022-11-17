import React, { useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { HeadingProvider } from './context';

const useHeading = () => {
  const ref = useRef();
  const [heading, setHeading] = useState(0);
  const handleSetHeading = () => {
    if (ref.current){
      ref.current.getCamera().then(camera => setHeading(camera.heading))
    }
  }
  return {ref, heading, handleSetHeading}
}

const MapViewWithHeading = ({children, onRegionChangeComplete, ...mapViewProps}) => {
  const {ref, heading, handleSetHeading} = useHeading();
  const handleChange = (...args) => {
    if (typeof onRegionChangeComplete === 'function') {
      onRegionChangeComplete(...args);
    }
    handleSetHeading();
  }
  return (
    <MapView {...mapViewProps} ref={ref} onRegionChangeComplete={handleChange}>
      <HeadingProvider value={heading}>
        {children}
      </HeadingProvider>
    </MapView>
  )
}

export default MapViewWithHeading;