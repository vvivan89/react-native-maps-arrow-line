// @ts-nocheck
import React, { useMemo } from "react";
import { Polyline, Marker } from "react-native-maps";
import DefaultArrow from "./default";
import calculateRotation from './calc';

const ArrowedPolyline = ({arrow = null, addOnlyLastArrow = false, arrowSize = 8, ...polylineProps}) => {
  const {
    coordinates = [],
    geodesic = false,
    strokeColor = 'black',
    strokeColors = [], // iOS only
  } = polylineProps;

  if (coordinates.length < 2) { return null; }

  const markerData = useMemo(() => {
     if(addOnlyLastArrow){
      const index = coordinates.length - 1;
      return [calculateRotation(coordinates[index], coordinates[index - 1], geodesic)]
     }
     const result = coordinates.map((coord, index) => calculateRotation(coord, coordinates[index - 1], geodesic));
     // first item will be empty as we don't place marker at the line start
     result.shift();
     return result;
  }, [coordinates, geodesic, addOnlyLastArrow]);

  return (
    <>
      <Polyline {...polylineProps}/>
      {markerData.map((markerProps, index) => {
        const Component = typeof arrow === 'function' ? arrow : DefaultArrow;
        const color = strokeColors[index % strokeColors.length] || strokeColor;
        return (
          <Marker {...markerProps} tappable={false} anchor={{ y: -0.01 }} centerOffset={{y: -0.01}}>
            <Component color={color} size={arrowSize} />
          </Marker>
        );
      })}
    </>
  )
};

export default ArrowedPolyline;