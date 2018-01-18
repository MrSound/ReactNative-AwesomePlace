import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';
import ListItem from './src/components/ListItem/ListItem';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList';

import placeImage from './src/assets/beautiful-place.jpg';

class App extends Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
    console.log("Place Added.");
  }

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  modalClosedHandler = () => {
    this.props.onDeSelectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  }
});

const mapStateToProps = (state) => ({
  places: state.places.places,
  selectedPlace: state.places.selectedPlace
})

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeSelectPlace: () => dispatch(deselectPlace())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
