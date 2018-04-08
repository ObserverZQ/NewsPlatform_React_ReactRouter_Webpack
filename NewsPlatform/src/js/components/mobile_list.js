import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {Row, Col, Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;

//下拉，点击加载更多组件
import Tloader from 'react-touch-loader'
class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: [],
            count: 10,
            hasMore: 0,
            initializing: 1,
            idx: 0,
            refreshedAt: Date.now()
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
            +this.props.type+"&count="+this.state.count, myFetchOptions)
            .then(response=> response.json())
            .then(json => {
                console.log(json);
                this.setState({news: json})
            });
    }
    //resolve参数，标识处理是否完成，完成则关掉刷新的小圈圈
    handleLoadMore(resolve) {
        setTimeout(()=>{
            const count = this.state.count;
            this.setState({
                count: count+10,
            })
            var myFetchOptions = {
                method: 'GET'
            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
                +this.props.type+"&count="+this.state.count, myFetchOptions)
                .then(response=> response.json())
                .then(json => {
                    console.log(json);
                    this.setState({news: json})
                });
            this.setState({
                hasMore: count>0 && count<80
            })
            resolve();
        }, 2e3);
    }

    handleRefresh(resolve, reject){
        setTimeout(()=>{
            const idx = this.state.idx;
            const count = this.state.count;
            this.setState({
                idx: idx+5,
                count: count+10,
            })
            var myFetchOptions = {
                method: 'GET'
            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
                +this.props.type+"&count="+this.state.count, myFetchOptions)
                .then(response=> response.json())
                .then(json => {
                    console.log(json);
                    this.setState({news: json.slice(idx)})
                });
            this.setState({
                hasMore: count>0 && count<80
            })
            resolve();
        }, 2e3);
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                hasMore: 1,
                initializing: 2
            })
        }, 2e3);
    }
    render() {
        var {hasMore, initializing, refreshedAt} = this.state;
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
                        <Tloader className="main"
                                 onLoadMore={this.handleLoadMore.bind(this)}
                                 onRefresh={this.handleRefresh.bind(this)}
                                 hasMore={hasMore}
                                 initializing={initializing}>
                            {newsList}
                        </Tloader>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MobileList;