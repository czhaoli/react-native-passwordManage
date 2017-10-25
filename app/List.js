import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StateUtils } from 'react-navigation'
import { List, Button, WhiteSpace, WingBlank, Flex, InputItem, SearchBar} from 'antd-mobile';
import s from './styles';
import * as actions from './redux/storage/storageAct';
const arrow = require('antd-mobile/lib/style/images/arrow.png');
import {Line, Arrow} from 'antd-mobile/lib/list/style/index.native';

const navAndroid = {header: <View/>, title: '列表', };
const navIos = {
  title: '列表',
};
class DataList extends Component {
  static navigationOptions = Platform.OS === 'ios' ? navIos : navAndroid
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
        <View key={index} style={[Line, {justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, backgroundColor: 'white', borderBottomWidth: 1}]}>
          <View>
            <Text
              key={1}
              style={[s.fs28, s.c0, s.lh32, s.h34, {...this.getHeightByContent(name)}]}
              numberOfLines={1}>{name}</Text>
              <Text key={2}
                style={[s.fs28, s.c6, s.lh32, s.h34, {...this.getHeightByContent(remarks)}]}
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
  onChange(value) {
    this.props.searchList(value);
  }
  onCancel() {
    Keyboard.dismiss();
  }
  render() {
    const {list = []} = this.props;
    const datas = list.map(item => {
      item.key = item._id;
      return item;
    });
    return (
      <View style={{flex: 1, }}>
        <SearchBar ref={(ref)=>this.searchBar = ref} placeholder="账号、备注" onChange={this.onChange.bind(this)} onCancel={this.onCancel.bind(this)}/>
        <FlatList
          style={{flex: 1}}
          data={datas}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

export default connect(({storageRed})=>storageRed, actions)(DataList);
