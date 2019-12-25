import React from 'react';
import { Colors } from '@blueprintjs/core';
import removeAccents from 'remove-accents';
import { momentWithLocale } from '../utils/tools';

import ModuleLayout from "../layouts/ModuleLayout";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    locale: string
    moon_phase: number|undefined
}

interface IState {
    days: string
    day: string
    month: string
    date: string
}

class ModuleDate extends React.Component<IPropsFromState, IState> {
    private interval: number | undefined;

    public state: IState = {
        days: '00',
        day: 'Monday',
        month: 'January',
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
            days: date.format('DD'),
            day: date.format('dddd'),
            month: date.format('MMMM'),
            date: date.format('DD MMMM')
        });
    };

    render() {
        return (
            <ModuleLayout label='Date'>
                <div className="datetime-layout">
                    <div className="date">{ removeAccents(this.state.date) }</div>
                    <div className="date">{ this.state.day }</div>
                    <i className='wi wi-moon-waxing-gibbous-2' />
                </div>
            </ModuleLayout>
        )
    }
}

export default ModuleDate;
