import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configStore from './src/store/configStore';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configStore();
// Register Screen
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login "
  }
});