import { View, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react';

class PlaceInput extends React.Component {
    state = {
        placeName: ""
    };
    placeNameChangeHandler = (val) => {
        this.setState({ placeName: val, });
    };
    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        this.setState({ placeName: "" });
        this.props.onPlaceAdded(this.state.placeName);
    }
    render() {
        const { placeSubmitHandler } = this.props;
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangeHandler}
                    placeholder="An awesome place"
                    style={styles.placeInput}
                />
                <Button
                    title="Add"
                    style={styles.placeButton}
                    onPress={this.placeSubmitHandler}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});

export default PlaceInput;