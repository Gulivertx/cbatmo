import React from 'react';
import { Colors } from "@blueprintjs/core";
import removeAccents from 'remove-accents';
import { Flex  } from 'reflexbox'
import { IPlace } from "../models/NetatmoNAMain";
import { momentWithLocale } from "../utils/tools";
import ModuleLayout from "../layouts/ModuleLayout";
import {Orientation} from "../store/application/types";

interface IPropsFromState {
    station_name?: string
    last_status_store?: number
    place?: IPlace
    reachable?: boolean
    locale: string
    orientation?: Orientation
}

interface IState {
    last_status_store: string
}

class ModuleNetatmoInformation extends React.Component<IPropsFromState, IState> {
    private interval: number | undefined;

    public state = {
        last_status_store: ''
    };

    public componentDidMount(): void {
        this.lastStatusStore();

        this.interval = window.setInterval(() => {
            this.lastStatusStore()
        }, 60000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public componentDidUpdate(prevProps: Readonly<IPropsFromState>, prevState: Readonly<IState>, snapshot?: any) {
        if (prevProps.last_status_store !== this.props.last_status_store) {
            this.lastStatusStore();
        }
    }

    private lastStatusStore = () => {
        let moment = momentWithLocale(this.props.locale);
        const now = moment();
        const updateDate = moment.unix(this.props.last_status_store ? this.props.last_status_store : 0);
        this.setState({last_status_store: moment.duration(now.diff(updateDate)).humanize()});
    };

    public render() {
        return (
            <ModuleLayout label={`Station ${this.props.station_name}`} reachable={this.props.reachable} fill={false} vertical_divider={this.props.orientation === 'landscape'}>
                <Flex justifyContent='flex-end' alignItems='flex-end' flexDirection={this.props.orientation === 'portrait' ? 'column' : 'row'}>
                    {this.props.orientation === 'landscape' && <div className="last-update" style={{ color: Colors.GRAY4, marginRight: 12 }}>{this.state.last_status_store}</div>}
                    <div>{removeAccents(this.props.place ? this.props.place.city : '')} - {this.props.place?.altitude}m</div>
                    {this.props.orientation === 'portrait' && <div className="last-update" style={{ color: Colors.GRAY4 }}>{this.state.last_status_store}</div>}
                </Flex>
            </ModuleLayout>
        )
    }
}

export default ModuleNetatmoInformation
