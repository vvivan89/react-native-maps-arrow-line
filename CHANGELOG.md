# CHANGE LOG

## 0.2.0

#### Bug fixes
[#1](https://github.com/vvivan89/react-native-maps-arrow-line/issues/1) - arrows do not follow manual rotation of the map

#### Changes
Introduced **MapViewWithHeading** component as an HOC above **MapView** from react-native-maps. The purpose of this HOC is to receive the camera heading of the map and pass it to **ArrowedPolyline** to calculate the necessary additional arrow rotation.

#### Backwards compatibility
**Partly Compatible**
:heavy_check_mark: **ArrowedPolyline** component v0.1.2 and below, used with generic **MapView** from react-native-maps will continue to work.<br/>
:heavy_multiplication_x: The map rotation issue could only be fixed by manually replacing the **MapView** component with the **MapViewWithHeading** component from the package.