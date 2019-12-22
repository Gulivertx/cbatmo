import React from 'react';
import { Colors } from '@blueprintjs/core';

import { momentWithLocale } from '../utils/tools'

class NetatmoTimer extends React.Component {
    state = {
        last_status_store: null
    };

    componentDidMount() {
        this.lastStatusStore();

        this.interval = setInterval(() => {
            this.lastStatusStore()
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    lastStatusStore = () => {
        let moment = momentWithLocale(this.props.locale);
        const now = moment();
        const updateDate = moment.unix(this.props.last_status_store);
        this.setState({last_status_store: moment.duration(now.diff(updateDate)).humanize()});
    };

    render() {
        return (
            <div style={{ color: Colors.GRAY3, fontSize: '0.8rem' }}>{this.state.last_status_store}</div>
        )
    }
}

export default NetatmoTimer
