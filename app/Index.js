import React, {Component} from 'react';
import {View} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './redux/configure-store';
import Login from './Login';
import Home from './Home';
import Edit from './Edit';
import List from './List';
import Add from './Add';
import s from './styles';


const MainScreenNavigator = TabNavigator({
  List: { screen: List},
  Add: { screen: Add },
}, {
  // tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: '#108ee9',
    style: [{height: 40}],
    labelStyle: [{fontSize: 18, height: 24}],
  },
});
const App = StackNavigator({
  login: { screen: Login },
  home: { screen: MainScreenNavigator },
  edit: {screen: Edit},
}, {initialRouteName: 'login'});

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;