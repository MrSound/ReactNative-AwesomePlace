import React, { Component } from "react";
import { View, Button, StyleSheet, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";
class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.401376,
            latitudeDelta: 0.0122, //รัศมี หรือ Zooming Level แกน y จะ fix เหมือน height
            longitudeDelta://แกน x หาตามอัตราส่วนตามความกว้างของหน้าจอ
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
        }
    };
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            };
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                />
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={() => alert("Pick Location!")} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 5
    }
});
export default PickLocation;