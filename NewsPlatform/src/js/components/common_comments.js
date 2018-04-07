import React from 'react'
import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, message, Form, Input, Button, Card, Modal} from 'antd';

//用于登录表单
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//接收文章id，获取其历史评论
class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
            + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json});
            })
    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment" +
            "&userid="+localStorage.userid
            +"&uniquekey="+this.props.uniquekey
            +"&commnet="+formData.remark)
            .then(response => response.json())
            .then(json => {
                //添加完评论后重新加载页面
                this.componentDidMount();
            })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?
            comments.map((comment, index)=>(
                <Card key={index} title={comment.userName}
                      extra={<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "loading..."
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('remark', {initialValue: ''})(
                                    <Input type="textarea" placeholder="随便写"/>
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CommonComments = Form.create({}) (CommonComments);