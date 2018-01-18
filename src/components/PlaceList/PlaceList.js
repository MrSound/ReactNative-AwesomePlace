import { FlatList, StyleSheet } from 'react-native';
import React from 'react'

import ListItem from '../ListItem/ListItem';

const placeList = ({ places, onItemSelected }) => {
    return (
        <FlatList
            style={styles.listContainter}
            data={places}
            renderItem={(info) => (
                <ListItem
                    placeName={info.item.name}
                    placeImage={info.item.image}
                    onItemPressed={() => onItemSelected(info.item.key)}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainter: {
        width: "100%"
    }
});

export default placeList;