import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from '../actions/actionTypes';

import placeImage from '../../assets/beautiful-place.jpg';

const initialState = {
    places: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: placeImage,
                    location: action.location
                    // image: {
                    //     uri: "http://renatures.com/wp-content/uploads/2016/11/flowers-pink-amazing-shrubs-walk-great-place-view-beautiful-photography-pretty-flower-park-beauty-spring-garden-green-lovely-season-nice-alley-trees-wallpaper-windows-8.jpg"
                    // }
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => (place.key !== action.placeKey)),
            };
        default:
            return state;
    }
}

export default reducer;