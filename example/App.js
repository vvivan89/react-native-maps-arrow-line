
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import ArrowedPolyline from 'react-native-maps-line-arrow';

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const TEST_POINTS = [
  { latitude: 52.4, longitude: 18.7 },
  { latitude: 52.1, longitude: 18.4 },
  { latitude: 52.6, longitude: 18.3 },
  { latitude: 51.6, longitude: 18.0 },
  { latitude: 53.1, longitude: 18.8 },
  { latitude: 52.9, longitude: 19.4 },
  { latitude: 52.2, longitude: 21 },
  { latitude: 52.4, longitude: 21 },
  { latitude: 51.8, longitude: 120 },
]

export default function App() {
  return (
      <MapView
        initialRegion={INITIAL_REGION}
        style={styles.map}
      >
        <ArrowedPolyline coordinates={TEST_POINTS} geodesic />
      </MapView>
  );
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject },
})