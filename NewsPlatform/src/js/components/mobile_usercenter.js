import React from 'react'

import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, message, Form, Input, Button, Card, notification} from 'antd';
import MobileHeader  from './mobile_header'
import MobileFooter from './mobile_footer'
//用于登录表单
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileUserCenter extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            {/*antd要求同一元素级别下面相同的元素要有不同key*/}
                            <TabPane tab="我的收藏" key="1">

                            </TabPane>
                            <TabPane tab="我的评论" key="2">

                            </TabPane>
                            <TabPane tab="头像设置" key="3">

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