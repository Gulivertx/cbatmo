import React from 'react';
import moment from 'moment';
import 'moment/locale/fr-ch';

moment.locale('en');

class NetatmoTimer extends React.Component {

    state = {
        last_status_store: null
    };

    componentWillMount() {
        this.lastStatusStore();

        this.interval = setInterval(() => {
            this.lastStatusStore()
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    lastStatusStore = () => {
        const now = moment();
        const updateDate = moment.unix(this.props.last_status_store);
        this.setState({last_status_store: moment.duration(now.diff(updateDate)).humanize()});
    };

    render() {
        return (
            <small>{this.state.last_status_store} ago</small>
        )
    }
}

export default NetatmoTimer
