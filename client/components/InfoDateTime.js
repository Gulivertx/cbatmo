import React from 'react';
import { Colors } from '@blueprintjs/core';
import { momentWithLocale } from '../utils/tools';

class InfoDateTime extends React.Component {
    state = {
        hour: null,
        minutes: null,
        date: null
    };

    componentDidMount() {
        this.clock();

        this.interval = setInterval(() => {
            this.clock()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    clock = () => {
        let moment = momentWithLocale(this.props.locale);
        const date = moment();

        this.setState({
            hour: date.format('HH'),
            minutes: date.format('mm'),
            date: date.format('dddd DD MMMM YYYY')
        });
    };

    render() {
        return (
            <div className='datetime-layout'>
                <div className="time">{ this.state.hour }:{ this.state.minutes }</div>
                <div className="date" style={{ color: Colors.GRAY3 }}>{ this.state.date }</div>
            </div>
        )
    }
}

export default InfoDateTime;
