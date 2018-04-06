import React from 'react'
import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal} from 'antd';

//用于登录表单
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }
    componentWillMount() {
        if (localStorage.userid!==0) {
            this.setState({
                hasLogined: true,
                userid: localStorage.userid,
                userNickName: localStorage.userNickName
            });
        }
    }
    setModalVisible(value) {
        this.setState({modalVisible: value})
    }

    handleClick(e) {
        if (e.key === "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    }

    handleSubmit(e) {
        //页面向API提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        //获取表单数据，是一个Object
        var formData = this.props.form.getFieldsValue();
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action +
            "&username=" + formData.userName +
            "&password=" + formData.password +
            "&r_userName=" + formData.r_userName +
            "&r_password=" + formData.r_password +
            "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({userNickName: json.NickUserName, userid: json.UserId});
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if (this.state.action === "login") {
            this.setState({hasLogined: true});
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    }

    //判断登录注册对话框界面是处于登录还是注册
    callback(key) {
        if (key === 1) {
            this.setState({action: 'login'});
        } else if (key === 2) {
            this.setState({action: 'register'});
        }
    }
    login(){
        this.setModalVisible(true);
    }
    //退出
    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined: false});
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined ?
            <Icon type="inbox" onClick={this.logout.bind(this)}/>
            :
            <Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileHeader">
                <header>
                    <img src="./src/images/logo.png" alt=""/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                {/*弹出框隐藏的，写哪都行*/}
                <Modal title="用户中心"
                       wrapClassName="vertical-center-modal"
                       visible={this.state.modalVisible}
                       onCancel={() => this.setModalVisible(false)}
                       onOk={() => {
                           this.setModalVisible(false)
                       }}
                       okText="关闭">
                    <Tabs type="card">
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    {getFieldDecorator('userName')(
                                        <Input placeholder="请输入您的账号"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password')(
                                        <Input type="password" placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>

                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldDecorator('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password"
                                           placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password"
                                           placeholder="请再次输入您的密码" {...getFieldDecorator('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default MobileHeader=Form.create({})(MobileHeader);