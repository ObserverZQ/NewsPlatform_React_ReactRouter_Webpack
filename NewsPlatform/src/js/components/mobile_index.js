import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
class MobileIndex extends React.Component{
    render() {
        return (
            <div>
                <MobileHeader />
                <MobileFooter/>
            </div>
        );
    }
}

export default MobileIndex;