import React from 'react';
import { Colors } from '@blueprintjs/core';
import cx from 'classnames';
import removeAccents from 'remove-accents';
import { withTranslation, WithTranslation } from 'react-i18next';
import { momentWithLocale } from '../../utils/tools';
import ModuleLayout from "../../layouts/ModuleLayout";
import {PropsFromRedux} from "./ModuleDateTime.container";

interface IState {
    hour: string
    minutes: string
    seconds: string
    date: string
}

class ModuleDateTime extends React.Component<PropsFromRedux & WithTranslation, IState> {
    private interval: number | undefined;

    public state: IState = {
        hour: '00',
        minutes: '00',
        seconds: '00',
        date: ''
    };

    public componentDidMount(): void {
        this.clock();

        this.interval = window.setInterval(() => {
            this.clock()
        }, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    private clock = (): void => {
        let moment = momentWithLocale(this.props.locale as string);
        const date = moment();

        this.setState({
            hour: date.format('HH'),
            minutes: date.format('mm'),
            seconds: date.format('ss'),
            date: date.format('dddd DD MMMM')
        });
    };

    render() {
        let moment = momentWithLocale(this.props.locale as string);

        return (
            <ModuleLayout label={this.props.t('netatmo.time')} reachable={true} vertical_divider={this.props.orientation === 'landscape'}>
                <div className="module-datetime">
                    {
                        this.props.orientation === 'landscape' ? (
                            <div className="time">{ this.state.hour }:{ this.state.minutes }<small>{this.state.seconds}</small></div>
                        ) : null
                    }
                    <div className="date" style={{ color: Colors.GRAY5 }}>{ removeAccents(this.state.date) }</div>
                    <div className="sun">
                        <div className={cx(!this.props.sunrise_time && 'bp3-skeleton')}>
                            <div className="sunrise" style={{ color: Colors.GRAY4 }}>{this.props.t('forecast.sunrise')}</div>
                            <i className='wi wi-sunrise' style={{ color: Colors.GOLD4 }}/> {moment.unix(this.props.sunrise_time ? this.props.sunrise_time : 0).format('HH:mm')}
                        </div>
                        <div className={cx(!this.props.sunset_time && 'bp3-skeleton')}>
                            <div className="sunset" style={{ color: Colors.GRAY4 }}>{this.props.t('forecast.sunset')}</div>
                            <i className='wi wi-sunset' style={{ color: Colors.GOLD4 }}/> {moment.unix(this.props.sunset_time ? this.props.sunset_time : 0).format('HH:mm')}
                        </div>
                    </div>
                </div>
            </ModuleLayout>
        )
    }
}

export default withTranslation('common')(ModuleDateTime);
