import React from 'react'
import {Row, Col} from 'antd'

class MobileFooter extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top'
        }
    }

    render() {
        return (
            <footer>
                <Row type="flex" justify="center">
                    <Col span={2}></Col>
                    <Col span={20} className="footer">
                        &copy;&nbsp;2018 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    }
}

export default MobileFooter;