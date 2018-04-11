import React from 'react'

import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, message, Form, Input, Button, Card, notification, Upload, Modal} from 'antd';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
//用于登录表单
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewImage: '',
            previewVisible: false,
            modalVisible: false,
            usercollection: [],
            usercomments: []
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc' +
            '&userid=' + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercollection: json
                });
                document.title = "个人中心";
            });

        //获取用户评论
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments' +
            '&userid='+localStorage.userid, myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    usercomments: json
                });
            });
    }

    handleCancel() {
        this.setState({
            previewVisible: false
        });
    }

    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url,
                    previewVisible: true
                });
            }
        };
        const {usercollection, usercomments} = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                      extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            )).reverse()
            :
            '';
        const usercommentList = usercomments.length ?
            usercomments.map((comment, index)=>(
                <Card key={index} title={`${comment.uniquekey}   ${comment.datetime}`}
                      extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            )).reverse()
            :
            '';
        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            {/*antd要求同一元素级别下面相同的元素要有不同key*/}
                            <TabPane tab="我的收藏" key="1">
                                <Row>
                                    <Col span={24}>
                                        {usercollectionList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="我的评论" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                        <Modal visible={this.state.previewVisible} footer={null}
                                               onCancel={this.handleCancel.bind(this)}>
                                            <img src={this.state.previewImage} alt="预览"/>
                                        </Modal>
                                    </Upload>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>

        );
    }
}

export default MobileUserCenter;