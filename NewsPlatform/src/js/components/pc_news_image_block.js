import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {Row, Col, Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;

class PCNewsImageBlock extends React.Component {
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
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const {news} = this.state;
        const newsList = news.length!==0 ?
            news.map((newsItem, index) => (
               <div key={index} className="imageblock">
                   <Link to={`details/${newsItem.uniqueKey}`} target="_blank">
                       <div className="custom-iamge">
                           <img style={styleImage} src={newsItem.thumbnail_pic_s} alt=""/>
                       </div>
                       <div className="custom-card">
                           <h3 style={styleH3}>{newsItem.title}</h3>
                           <p style={styleH3}>{newsItem.author_name}</p>
                       </div>
                   </Link>
               </div>
            ))
            : 'loading...';
        return (
            <div className="topNewsList">
                <Card title={this.props.cardTitle} bordered={true} style={{width: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        );
    }
}

export default PCNewsImageBlock;