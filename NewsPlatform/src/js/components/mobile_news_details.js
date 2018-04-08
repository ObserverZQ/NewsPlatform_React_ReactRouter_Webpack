import React from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import CommonComments from './common_comments'
import {Route, Router, Link, browserHistory} from 'react-router';
import {Row, Col, Tabs, Card} from 'antd';

const TabPane = Tabs.TabPane;

class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: {}
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        console.log('uniquekey: ' + this.props.match.params.uniquekey);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
            + this.props.match.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
            })
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader/>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr/>
                            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                        </Col>
                    </Row>
                    <MobileFooter/>
                </div>
            </div>
        );
    }
}

export default PCNewsDetails;