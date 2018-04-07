import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {Row, Col, Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;

class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: []
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
            +this.props.type+"&count="+this.props.count, myFetchOptions)
            .then(response=> response.json())
            .then(json => {
                console.log(json);
                this.setState({news: json})
            });
    }
    render() {
        const {news} = this.state;
        const newsList = news.length!==0 ?
            news.map((newsItem, index) => (
                <section key={index} className="m_article list-item sepecial_section clearfix">
                    <Link to={`/details/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                        </div>
                        <div className="m_article_desc clearfix">
                            <div className="m_article_desc_l">
                                <span className="m_article_channel">
                                    {newsItem.realtype}
                                </span>
                                <span className="m_article_time">
                                    {newsItem.date}
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            : 'loading...';
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MobileList;