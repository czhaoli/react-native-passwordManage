import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import storage from './storage';
import s from './styles';
import v4 from 'uuid/v4';
import { Button, WhiteSpace, WingBlank, Flex, InputItem } from 'antd-mobile';
import styles from 'antd-mobile/lib/input-item/style/index.native';
import {list_item_height_sm} from 'antd-mobile/lib/style/themes/default.native';

class Login extends Component {
  static navigationOptions = {
    title: '登录'
  }
  state = {
    pw: '',
    confirm: '',
    visible: false,
    tips: '请设置密码！\r\n注意：密码不可找回，一旦忘记就会失去所有信息，请您找个秘密的地方记下来。',
    pwd: undefined,
    loginPwd: '',
  }
  componentDidMount() {
    storage.load({
      key: 'login',
    }).then(pwd=>{
      this.setState({
        pwd,
      });
    }).catch(e=>{
      this.setState({
        pwd: null,
        visible: true,
      });
    });
  }
  pwChange(pw) {
    this.setState({pw});
  }
  confirmChange(confirm) {
    this.setState({confirm});
  }
  sign() {
    const {pw, confirm} = this.state;
    if (pw.trim() === '' || pw !== confirm) {
      this.setState({tips: '密码不为空，且两次密码要一致！', visible: true})
    } else {
      storage.save({
        key: 'login',
        data: pw,
      }).then(r=>{
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'home'}),
          ]
        })
        this.props.navigation.dispatch(resetAction)
      }).catch(e=>{
        this.setState({tips: '保存失败！', visible: true})
      });
    }
  }
  closeModal() {
    this.setState({visible: false});
  }
  login() {
    const {pwd, loginPwd} = this.state;
    console.log(pwd, loginPwd);
    if (loginPwd === pwd) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'home'}),
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.setState({
        tips: '密码错误！',
        visible: true,
      });
    }

  }
  loginPwdChange(loginPwd) {
    this.setState({loginPwd});
  }
  renderSetPw() {
    const {pw, confirm, visible, tips} = this.state;
    return (
      <View>
          <InputItem
           placeholder="请输入"
           clear
           labelNumber={5}
           value={pw}
           onChange={this.pwChange.bind(this)}
         ><Text style={{...styles.text, textAlign: 'right', marginRight: 0, }}>密码：</Text></InputItem>
          <InputItem
           placeholder="请输入"
           clear
           labelNumber={5}
           value={confirm}
           onChange={this.confirmChange.bind(this)}
         ><Text style={{...styles.text, textAlign: 'right', marginRight: 0, }}>确认密码：</Text></InputItem>
        <WhiteSpace size='lg'/>
        <Button type="primary" onClick={this.sign.bind(this)}>确定</Button>
      </View>
    );
  }
  renderLogin() {
    const {loginPwd} = this.state;
    return (
      <View>
        <InputItem
          autoFocus
         placeholder="请输入"
         type='password'
         value={loginPwd}
         clear
         onChange={this.loginPwdChange.bind(this)}
       >密码：</InputItem>
        <WhiteSpace size='lg'/>
        <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
      </View>
    );
  }
  renderPage() {
    const {pwd} = this.state;
    if (pwd === null) {
      return this.renderSetPw();
    } else if (typeof pwd === 'undefined') {
      return null;
    } else if (pwd) {
      return this.renderLogin();
    }
  }
  render() {
    const {visible, tips} = this.state;
    return (
      <WingBlank>
        <WhiteSpace />
        {this.renderPage()}
        <Modal
          animationType={"fade"}
          visible={visible}
          transparent={true}
          >
         <View style={[s.center, {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'}]}>
          <View style={[s.bgWhite, s.p30, s.br10, s.center, {width: '80%'}]}>
            <Text style={[s.mb30, s.lh28, s.fs24, s.c3]}>{tips}</Text>
            <Button style={{height: list_item_height_sm}} type="primary" onClick={this.closeModal.bind(this)}>知道了</Button>
          </View>
         </View>
        </Modal>
      </WingBlank>
    );
  }
}

export default Login;