declare module "react-native-maps-arrow-line" {
  import * as React from "react";
  import { MapPolylineProps } from "react-native-maps";

  export type ArrowLine = {};

  interface LineArrowProps {
    arrow?: (color: string, size: number) => React.ReactNode;
    addOnlyLastArrow?: boolean;
    arrowSize?: number;
  }

  export default class ArrowedPolyline extends React.Component<
    MapPolylineProps & LineArrowProps,
    any
  > {}
}
