import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        };
        fetch("https://us-central1-awesome-place-1516267937295.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
            });
        // fetch("https://awesome-place-1516267937295.firebaseio.com/places.json", {
        //     method: "POST",
        //     body: JSON.stringify(placeData)
        // })
        //     .catch(err => console.log(err))
        //     .then(res => res.json())
        //     .then(parsedRes => {
        //         console.log(parsedRes);
        //     });
    }
};

export const deletePlace = key => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

// return {
//     type: ADD_PLACE,
//     placeName: placeName,
//     location: location,
//     image: image
// };