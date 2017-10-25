import React, {Component} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
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
    style: [{height: 40, backgroundColor: 'white'}],
    tabStyle: {flex: 1, height: 40, flexDirection: 'column', justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'space-around'},
    labelStyle: [{fontSize: 18}, Platform.OS === 'ios' ? {} : {color: 'black'}],
  },
});
const navigationOptions = {
  headerStyle: [Platform.OS === 'ios' ? s.h100 : s.h70, Platform.OS === 'ios' ? {} : {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#999'}],
  headerTitleStyle: s.fs30,
};
const App = StackNavigator({
  login: {
    screen: Login,
    navigationOptions,
  },
  home: {
    screen: MainScreenNavigator,
    navigationOptions,
  },
  edit: {
    screen: Edit,
    navigationOptions,
  },
}, {
  initialRouteName: 'login',
});

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;