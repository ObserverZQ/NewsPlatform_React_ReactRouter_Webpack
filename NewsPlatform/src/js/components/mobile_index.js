import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import MobileList from './mobile_list'
import {Row, Col, Carousel} from 'antd'
import {Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal} from 'antd';

const TabPane = Tabs.TabPane;
class MobileIndex extends React.Component{

    render() {
        document.title = "React News";
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <MobileHeader />
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                            </Carousel>
                        </div>
                        <MobileList count={20} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList count={20} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList count={20} type="guonei"/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList count={20} type="guoji"/>
                    </TabPane>
                    <TabPane tab="体育" key="5">
                        <MobileList count={20} type="tiyu"/>
                    </TabPane>
                    <TabPane tab="军事" key="6">
                        <MobileList count={20} type="junshi"/>
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    }
}

export default MobileIndex;