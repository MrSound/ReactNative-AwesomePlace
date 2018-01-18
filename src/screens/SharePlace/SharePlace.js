import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';

import { addPlace } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import validate from '../../utility/validation';

export class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  };
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
  placeNameChangeHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            touched: true,
            valid: validate(val, prevState.controls.placeName.validationRules)
          }
        }
      };
    });
  }
  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() != "") {
      this.props.onAddPlace(this.state.controls.placeName.value);
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangeHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Place!"
              onPress={this.placeAddedHandler}
              disabled={!this.state.controls.placeName.valid}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 5
  }
});
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => (dispatch(addPlace(placeName)))
  };
}
export default connect(null, mapDispatchToProps)(SharePlace);