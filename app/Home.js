import React, { Component } from 'react';
import List from './List';
import Add from './Add';
import {View} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import s from './styles';
import storage from './storage';

class Home extends Component {
  static navigationOptions = ({ navigation: {state: {params: {title} = {}} = {}} = {} }) => ({
    title: `${title || '列表'}`,
  });
  state = {
    datas: []
  }
  componentDidMount() {
    this.loadStorage();
  }
  loadStorage() {
    storage.load({
      key: 'datas',
    }).then(datas=>{
      this.setState({
        datas
      });
    }).catch(e=>console.log('get Datas error', e));
  }
  onChangeTab({i}={}) {
    let title;
    switch (i) {
      case 0:
        title = '列表';
        break;
      case 1:
        title = '新增';
        break;
      default:
    }
    this.props.navigation.setParams({title});
  }
  render() {
    console.log('home');
    return (
      <ScrollableTabView
        onChangeTab={this.onChangeTab.bind(this)}
        tabBarPosition='bottom'
        tabBarBackgroundColor="#fcfcfc"
        tabBarActiveTextColor="#3e9ce9"
        tabBarInactiveTextColor="#aaaaaa"
      >
        <View key={0} tabLabel={'列表'}><List {...this.props} loadStorage={this.loadStorage.bind(this)} datas={this.state.datas}/></View>
        <View key={1} tabLabel={'新增'}><Add loadStorage={this.loadStorage.bind(this)}/></View>
      </ScrollableTabView>
    );
  }

}

export default Home;