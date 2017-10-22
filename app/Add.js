import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import s from './styles';
import v4 from 'uuid/v4';
import {InputItem, TextareaItem, WhiteSpace, Button} from 'antd-mobile';
import * as actions from './redux/storage/storageAct';
import lodash from 'lodash';

class Add extends Component {
  static navigationOptions = {
    title: '新增'
  }
  state = {
    name: '',
    pw: '',
    remarks: '',
    visible: false,
    tips: '账号和密码都必须输入！',
  }
  reset() {
    this.setState({name: '', pw: '', remarks: '',});
  }
  nameChange(name) {
    this.setState({name});
  }
  pwChange(pw) {
    this.setState({pw});
  }
  remarksChange(remarks, ...arr) {
    console.log(arr);
    this.setState({remarks});
  }
  save() {
    const {name, pw, remarks} = this.state;
    if (name.trim() === '' && pw.trim() === '' && remarks.trim() === '') {
      this.setState({tips: '请输入信息！', visible: true})
    } else {
      const {list} = this.props;
      const datas = lodash.cloneDeep(list);
      const _id = v4();
      const createDate = new Date().toString();
      const updateDate = new Date().toString();
      const obj = {name, pw, remarks, _id, createDate, updateDate};
      datas.push(obj);
      this.props.setList(datas, ()=>{
        this.props.navigation.navigate('List');
      }, ()=>{
        this.setState({tips: '保存失败！', visible: true})
      });
    }
  }
  closeModal() {
    this.setState({visible: false});
  }
  render() {
    const {name, pw, visible, tips, remarks} = this.state;
    return (
      <View>
        <WhiteSpace />
        <InputItem
          style={{borderBottomWidth: 1}}
          placeholder="请输入"
          clear
          value={name}
          onChange={this.nameChange.bind(this)}
        >账号：</InputItem>
        <InputItem
          style={{borderBottomWidth: 1}}
          placeholder="请输入"
          clear
          value={pw}
          onChange={this.pwChange.bind(this)}
        >密码：</InputItem>
        <WhiteSpace />
        <Text style={{marginLeft: 15, fontSize: 17}}>备注：</Text>
        <WhiteSpace />
        <TextareaItem
          placeholder="请输入"
          clear
          style={[{marginRight: 15}, s.br10]}
          rows={4}
          value={remarks}
          onChange={this.remarksChange.bind(this)}
        />
        <WhiteSpace size='lg'/>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            style={{marginRight: 30}}
            type="primary"
            onClick={this.save.bind(this)}
          >保存</Button>
          <Button
            onClick={this.reset.bind(this)}
          >清空</Button>
        </View>
        <Modal
          animationType={"fade"}
          visible={visible}
          transparent={true}
          >
         <View style={[s.center, {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'}]}>
          <View style={[s.bgWhite, s.p30, s.br10, s.center, {width: '80%'}]}>
            <Text style={[s.mb30, s.lh28, s.fs24, s.c3]}>{tips}</Text>
            <Button style={{height: 35}} type="primary" onClick={this.closeModal.bind(this)}>知道了</Button>
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

export default connect(({storageRed})=>storageRed, actions)(Add);
