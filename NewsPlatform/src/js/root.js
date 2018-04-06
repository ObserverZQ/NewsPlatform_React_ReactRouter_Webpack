import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index'
import MobileIndex from './components/mobile_index'
//移动端
import MediaQuery from 'react-responsive'
class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <PCIndex/>
                </MediaQuery>

                {/*移动端*/}
                <MediaQuery query='(max-device-width: 1224px)'>
                    <MobileIndex/>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
// export default Root;