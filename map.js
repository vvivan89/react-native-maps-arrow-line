import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import MapView from 'react-native-maps';
import { HeadingProvider } from 'react-native-maps-line-arrow/context';

const useHeading = (ref) => {
  const [heading, setHeading] = useState(0);
  const handleSetHeading = () => {
    if (ref.current){
      ref.current.getCamera().then(camera => setHeading(camera.heading))
    }
  }
  return {ref, heading, handleSetHeading}
}

// @ts-ignore
const MapViewWithHeading = forwardRef(({children, onRegionChangeComplete, Component, ...mapViewProps}, ref) => {
  const innerRef = useRef();
  useImperativeHandle(ref, () => innerRef.current);

  const {heading, handleSetHeading} = useHeading(innerRef);
  const handleChange = (...args) => {
    if (typeof onRegionChangeComplete === 'function') {
      onRegionChangeComplete(...args);
    }
    handleSetHeading();
  }

  const SafeComponent = Component || MapView;
  return (
    <HeadingProvider value={heading}>
      <SafeComponent {...mapViewProps} ref={innerRef} onRegionChangeComplete={handleChange}>
          {children}
      </SafeComponent>
    </HeadingProvider>
  )
});

export default MapViewWithHeading;