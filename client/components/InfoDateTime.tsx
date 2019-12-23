import React from 'react';
import { Colors } from '@blueprintjs/core';
import { momentWithLocale } from '../utils/tools';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    locale: string
}

interface IState {
    hour: string
    minutes: string
    seconds: string
    date: string
}

class InfoDateTime extends React.Component<IPropsFromState, IState> {
    private interval: number | undefined;

    public state: IState = {
        hour: '00',
        minutes: '00',
        seconds: '00',
        date: ''
    };

    public componentDidMount(): void {
        this.clock();

        this.interval = setInterval(() => {
            this.clock()
        }, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    private clock = (): void => {
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
