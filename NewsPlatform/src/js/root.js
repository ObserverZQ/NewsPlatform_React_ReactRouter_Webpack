import React from 'react'
import ReactDOM from 'react-dom'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import 'antd/dist/antd.less';
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
import PCNewsDetails from './components/pc_news_details'
import MobileNewsDetails from './components/mobile_news_details'
import PCUserCenter from './components/pc_usercenter'
import MobileUserCenter from './components/mobile_usercenter'
//移动端
import MediaQuery from 'react-responsive'

class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={PCIndex}/>
                            <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                            <Route path="/usercenter" component={PCUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>

                {/*移动端*/}
                <MediaQuery query='(max-device-width: 1224px)'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}/>
                            <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                            <Route path="/usercenter" component={MobileUserCenter}/>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
// export default Root;