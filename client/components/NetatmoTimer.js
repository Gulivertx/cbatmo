import React from 'react';
import moment from 'moment';

class NetatmoTimer extends React.Component {
    state = {
        last_status_store: null
    };

    componentDidMount() {
        // Set locale for moment
        if (this.props.locale === 'fr') {
            console.log('Set moment to fr');
            require('moment/locale/fr');
            moment.locale('fr');
        } else {
            moment.locale('en');
            console.log('Set moment to en')
        }

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
            <small>{this.state.last_status_store}</small>
        )
    }
}

export default NetatmoTimer
