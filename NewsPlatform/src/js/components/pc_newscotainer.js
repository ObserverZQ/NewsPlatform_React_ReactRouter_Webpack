//把导航条中每个条目下的新闻存在这里
import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block'

const TabPane = Tabs.TabPane;

class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <Row>
                    <Col span={3}> </Col>
                    <Col span={18} className="container">
                        {/*左边放轮询图*/}
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            {/*新闻小版块*/}
                            <PCNewsImageBlock count={6} type="guoji" width="400px"
                                              cardTitle="国际头条" imageWidth="112px"/>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="新闻" key="1">
                                <PCNewsBlock count={25} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={25} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={8} type="guonei" width="100%"
                                              cardTitle="国内头条" imageWidth="132px"/>
                            <PCNewsImageBlock count={8} type="yule" width="100%"
                                              cardTitle="娱乐头条" imageWidth="132px"/>
                        </div>
                    </Col>
                    <Col span={3}> </Col>
                </Row>
            </div>
        );
    }
}

export default PCNewsContainer;

