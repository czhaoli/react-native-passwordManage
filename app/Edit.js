import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import s from './styles';
import v4 from 'uuid/v4';
import {InputItem, TextareaItem, WhiteSpace, Button, WingBlank, Modal as antdModal} from 'antd-mobile';
import lodash from 'lodash';
import { connect } from 'react-redux';
import * as actions from './redux/storage/storageAct';

const alert = antdModal.alert;

class Edit extends Component {
  static navigationOptions = {
    title: '编辑'
  }
  state = {
    name: '',
    pw: '',
    remarks: '',
    createDate: '',
    updateDate: '',
    visible: false,
    tips: '账号和密码都必须输入！',
  }
  componentDidMount() {
    const {state: {params: {data} = {}} = {}} = this.props.navigation;
    const {name, pw, remarks, createDate, updateDate} = data;
    this.setState({name, pw, remarks, createDate, updateDate})
  }
  reset() {
    const {state: {params: {data} = {}} = {}} = this.props.navigation;
    const {name, pw, remarks} = data;
    this.setState({name, pw, remarks,});
  }
  delete() {
    alert('删除提示', <Text style={{height:33, lineHeight: 33}}>您确定要删除吗?</Text>, [
      { text: '取消' },
      { text: '确定', onPress: this.deleteHandler.bind(this) },
    ])
  }
  deleteHandler() {
    const {state: {params: {callback, data, datas = []} = {}} = {}} = this.props.navigation;
    const {_id} = data;
    let itemIndex = -1;
    const oldData = datas.find((item, index) => {
      if (item._id === _id) {
        itemIndex = index;
        return true;
      }
    });
    const newDatas = lodash.cloneDeep(datas);
    newDatas.splice(itemIndex, 1);
    this.props.setList(newDatas, this.props.navigation.goBack, ()=>{
      this.setState({tips: '删除失败！', visible: true})
    })
  }
  nameChange(name) {
    this.setState({name});
  }
  pwChange(pw) {
    this.setState({pw});
  }
  remarksChange(remarks) {
    this.setState({remarks});
  }
  save() {
    const {name, pw, remarks} = this.state;
    if (name.trim() === '' && pw.trim() === '' && remarks.trim() === '') {
      this.setState({tips: '请输入信息！', visible: true})
    } else {
      const {state: {params: {callback, data, datas = []} = {}} = {}} = this.props.navigation;
      const {createDate, _id} = data;
      const updateDate = new Date().toString();
      const obj = {name, pw, remarks, updateDate, _id, createDate};
      const oldData = datas.find((item, index) => {
        if (item._id === _id) {
          return true;
        }
        return false;
      });
      const newDatas = datas.map((item, index) => {
        if (item._id === oldData._id) {
          return obj;
        }
        return item;
      });
      this.props.setList(newDatas, this.props.navigation.goBack, ()=>{
        this.setState({tips: '保存失败！', visible: true})
      })
    }
  }
  closeModal() {
    this.setState({visible: false});
  }
  toFixed(num) {
    return (num/100).toFixed(2).replace('0.', '');
  }
  formatDate(str) {
    const d = new Date(str);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${this.toFixed(d.getHours())}:${this.toFixed(d.getMinutes())}:${this.toFixed(d.getSeconds())}`;
  }
  render() {
    const {name, pw, visible, tips, remarks, updateDate, createDate} = this.state;
    return (
      <View>
        <InputItem
          style={{borderBottomWidth: 1}}
          placeholder="请输入"
          clear
          value={name}
          onChange={this.nameChange.bind(this)}
          onSubmitEditing={this.save.bind(this)}
        >账号：</InputItem>
        <InputItem
          style={{borderBottomWidth: 1}}
          placeholder="请输入"
          clear
          value={pw}
          onChange={this.pwChange.bind(this)}
          onSubmitEditing={this.save.bind(this)}
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
          onSubmitEditing={this.save.bind(this)}
        />
        <WhiteSpace size='lg'/>
        <WingBlank>
          <Text style={{fontSize: 17, lineHeight: 24}}>创建日期：{this.formatDate(createDate)}</Text>
          <Text style={{fontSize: 17, lineHeight: 24}}>修改日期：{this.formatDate(updateDate)}</Text>
        </WingBlank>
        <WhiteSpace size='lg'/>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            style={{marginRight: 30}}
            type="primary"
            onClick={this.save.bind(this)}
          >保存</Button>
          <Button
            style={{marginRight: 30}}
            onClick={this.reset.bind(this)}
          >还原</Button>
          <Button
            type="warning"
            onClick={this.delete.bind(this)}
          >删除</Button>
        </View>
        <Modal
          onRequestClose={()=>{}}
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

export default connect(({storageRed})=>storageRed, actions)(Edit);