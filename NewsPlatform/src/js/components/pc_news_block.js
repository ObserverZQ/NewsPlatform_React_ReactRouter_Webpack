import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {Row, Col, Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;

class PCNewsBlock extends React.Component {
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
                <li key={index}>
                    <Link to={`details/${newsItem.uniqueKey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
            ))
            : 'loading...';
        return (
          <div className="topNewsList">
              <Card>
                  <ul>
                      {newsList}
                  </ul>
              </Card>
          </div>
        );
    }
}

export default PCNewsBlock;