import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
import PCNewsDetails from './components/pc_news_details'
import MobileNewsDetails from './components/mobile_news_details'
//移动端
import MediaQuery from 'react-responsive'
class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex} />
                        <Route path="/details/:uniquekey" component={PCNewsDetails} />
                    </Router>
                </MediaQuery>

                {/*移动端*/}
                <MediaQuery query='(max-device-width: 1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex} />
                        <Route path="/details/:uniquekey" component={MobileNewsDetails} />
                    </Router>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
// export default Root;