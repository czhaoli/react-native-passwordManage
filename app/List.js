import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StateUtils } from 'react-navigation'
import { List, Button, WhiteSpace, WingBlank, Flex, InputItem } from 'antd-mobile';
import s from './styles';
import * as actions from './redux/storage/storageAct';
const arrow = require('antd-mobile/lib/style/images/arrow.png');
import {Line, Arrow} from 'antd-mobile/lib/list/style/index.native';

class DataList extends Component {
  static navigationOptions = {
    title: '列表'
  }
  componentDidMount() {
    this.props.getList();
  }
  itemClick(item) {
    const {list} = this.props;
    this.props.navigation.navigate('edit', {
      data: item,
      datas: list,
      callback: this.props.loadStorage,
    });
  }
  renderItem({item, index} = {}) {
    const {name = '', remarks = ''} = item || {};
    return (
      <TouchableOpacity onPress={this.itemClick.bind(this, item)}>
        <View key={index} style={[Line, {justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, backgroundColor: 'white'}]}>
          <View>
            <Text
              key={1}
              style={[s.fs24, s.c0, s.lh28, s.h30, {...this.getHeightByContent(name)}]}
              numberOfLines={1}>{name}</Text>
              <Text key={2}
                style={[s.fs24, s.c6, s.lh28, s.h30, {...this.getHeightByContent(remarks)}]}
                numberOfLines={1}>{remarks}</Text>
              </View>
              <Image style={Arrow} source={arrow}/>
            </View>
      </TouchableOpacity>
    );
  }
  getHeightByContent(text) {
    if (text === '') {
      return {height: 0};
    } else {
      return {}
    }
  }
  render() {
    const {list = []} = this.props;
    const datas = list.map(item => {
      item.key = item._id;
      return item;
    });
    return (
      <FlatList
        data={datas}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }
}

export default connect(({storageRed})=>storageRed, actions)(DataList);
