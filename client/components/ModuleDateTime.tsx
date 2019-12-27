import React from 'react';
import { Colors } from '@blueprintjs/core';
import cx from 'classnames';
import removeAccents from 'remove-accents';
import { momentWithLocale } from '../utils/tools';

import ModuleLayout from "../layouts/ModuleLayout";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    locale: string
    sunset_time: number|undefined
    sunrise_time: number|undefined
}

interface IState {
    hour: string
    minutes: string
    seconds: string
    date: string
}

class ModuleDateTime extends React.Component<IPropsFromState, IState> {
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
            seconds: date.format('ss'),
            date: date.format('dddd DD MMMM')
        });
    };

    render() {
        let moment = momentWithLocale(this.props.locale);

        return (
            <ModuleLayout label='Time' reachable={true}>
                <div className="datetime-layout">
                    <div className="time">{ this.state.hour }:{ this.state.minutes }<small>{this.state.seconds}</small></div>
                    <div className="date" style={{ color: Colors.GRAY5 }}>{ removeAccents(this.state.date) }</div>
                    <div className="sun">
                        <div className={cx(!this.props.sunrise_time && 'bp3-skeleton')}>
                            <div className="sunrise" style={{ color: Colors.GRAY4 }}>Sunrise</div>
                            <i className='wi wi-sunrise' style={{ color: Colors.GOLD4 }}/> {moment.unix(this.props.sunrise_time ? this.props.sunrise_time : 0).format('HH:mm')}
                        </div>
                        <div className={cx(!this.props.sunset_time && 'bp3-skeleton')}>
                            <div className="sunset" style={{ color: Colors.GRAY4 }}>Sunset</div>
                            <i className='wi wi-sunset' style={{ color: Colors.GOLD4 }}/> {moment.unix(this.props.sunset_time ? this.props.sunset_time : 0).format('HH:mm')}
                        </div>
                    </div>
                </div>
            </ModuleLayout>
        )
    }
}

export default ModuleDateTime;
