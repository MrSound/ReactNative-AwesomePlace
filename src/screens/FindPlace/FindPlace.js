import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import React, { Component } from 'react'

import PlaceList from '../../components/PlaceList/PlaceList';

export class FindPlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),// Initial value for opacity
    placesAnim: new Animated.Value(0)
  }
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  onNavigatorEvent = event => {
    //console.log(event);
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }
  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    });
  }
  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0, // Animate to opacity
      duration: 500, // Make it take a while
      useNativeDriver: true // ใช้การประมวลผลของ Native 
    }).start(() => {
      this.setState({ placesLoaded: true });
      this.placesLoadedHandler();
    });
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1, // Animate to opacity
      duration: 500, // Make it take a while
      useNativeDriver: true // ใช้การประมวลผลของ Native 
    }).start();
  }

  render() {
    let content = (
      <Animated.View style={{
        opacity: this.state.removeAnim, // กำหนดการแสดงผล
        transform: [
          {
            scale: this.state.removeAnim.interpolate({
              inputRange: [0, 1], // ตอนปรากฏ ให้แสดงจาก 0 -> 1 (ปกติ)
              outputRange: [2, 1] // ตอนหาย ให้ขนาดจาก 2 <- 1
            })
          }
        ]
      }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Place</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View style={{
          opacity: this.state.placesAnim, // กำหนดการแสดงผล
        }}>
          <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});
const mapStateToProps = state => {
  return {
    places: state.places.places
  }
};

export default connect(mapStateToProps)(FindPlace);