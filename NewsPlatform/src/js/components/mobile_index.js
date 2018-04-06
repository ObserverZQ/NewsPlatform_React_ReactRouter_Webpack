import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import {Row, Col} from 'antd'
import {Router, Route, Link, browserHistory} from 'react-router'
import {Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal} from 'antd';

const TabPane = Tabs.TabPane;
class MobileIndex extends React.Component{
    render() {
        return (
            <div>
                <MobileHeader />
                <Tabs>
                    <TabPane tab="头条" key="1">123</TabPane>
                    <TabPane tab="社会" key="2">123</TabPane>
                    <TabPane tab="国内" key="3">123</TabPane>
                    <TabPane tab="国际" key="4">123</TabPane>
                    <TabPane tab="体育" key="5">123</TabPane>
                    <TabPane tab="军事" key="6">123</TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    }
}

export default MobileIndex;