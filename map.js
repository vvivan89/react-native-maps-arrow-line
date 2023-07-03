import React, { Component, forwardRef, useImperativeHandle, useState } from 'react';
import MapView from 'react-native-maps';
import { HeadingProvider } from './context';

const useHeading = (ref) => {
  const [heading, setHeading] = useState(0);
  const handleSetHeading = () => {
    if (ref && ref.current){
      ref.current.getCamera().then(camera => setHeading(camera.heading))
    }
  }
  return {heading, handleSetHeading}
}

const MapViewWithHeading = forwardRef(({ children, onRegionChangeComplete, Component, ...mapViewProps }, ref) => {
  const { heading, handleSetHeading } = useHeading(ref);
  const handleChange = (...args) => {
    if (typeof onRegionChangeComplete === 'function') {
      onRegionChangeComplete(...args);
    }
    handleSetHeading();
  }

  const ComponentBase = Component || MapView;
  return (
    <HeadingProvider value={heading}>
      <ComponentBase {...mapViewProps} ref={ref} onRegionChangeComplete={handleChange}>
        {children}
      </ComponentBase>
    </HeadingProvider>
  )
});

export default MapViewWithHeading;