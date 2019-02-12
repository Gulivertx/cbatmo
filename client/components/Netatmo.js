import React from 'react';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";

//import NetatmoNAMainChartLineContainer from '../containers/NetatmoNAMainChartLineContainer';
//import NetatmoNAModule1ChartLineContainer from '../containers/NetatmoNAModule1ChartLineContainer';
//import NetatmoNAModule2ChartLineContainer from '../containers/NetatmoNAModule2ChartLineContainer';
//import NetatmoNAModule4ChartLineContainer from '../containers/NetatmoNAModule4ChartLineContainer';
import NetatmoTimer from './NetatmoTimer';

const intervalMinutes = 10, refreshTime = intervalMinutes * 60 * 1000;
const cssAnimationDuration = 200;

class Netatmo extends React.Component {
    constructor(props) {
        super(props);

        console.log('Fetch Netatmo Station Data');
        this.props.fetchStationData();
    }

    state = {
        enterTitle: false,
        enterModuleMain: false,
        enterModuleInternal: false,
        enterModuleRain: false,
        enterModuleExternal: false,
        enterModuleWind: false
    };

    componentDidMount() {
        setInterval(() => {
            this.props.fetchStationData();
        }, refreshTime);

        setTimeout(() => {
            this.setState({enterTitle: true});
            setTimeout(() => {
                this.setState({enterModuleMain: true});
                setTimeout(() => {
                    this.setState({enterModuleInternal: true});
                    setTimeout(() => {
                        this.setState({enterModuleRain: true});
                        setTimeout(() => {
                            this.setState({enterModuleExternal: true});
                            setTimeout(() => {
                                this.setState({enterModuleWind: true})
                            }, cssAnimationDuration);
                        }, cssAnimationDuration);
                    }, cssAnimationDuration);
                }, cssAnimationDuration);
            }, cssAnimationDuration);
        }, 2000);
    }

    radioStatusQuality = (value) => {
        if (value < 56) {
            return 'text-green';
        } else if (value >= 56 && value < 71) {
            return 'text-yellow';
        } else if (value >= 71) {
            return 'text-red';
        }
    };

    batteryStatusQuality = (value) => {
        if (value > 80) {
            return 'text-green';
        } else if (value <= 80 && value > 60) {
            return 'text-cyan';
        } else if (value <= 60 && value > 40) {
            return 'text-blue';
        } else if (value <= 40 && value > 20) {
            return 'text-yellow';
        } else if (value <= 20) {
            return 'text-red';
        }
    };

    render() {
        if (!this.props.loading_station_data) {
            return (
                <div className='full-page'>
                    <CSSTransition in={this.state.enterTitle} classNames='fade' timeout={cssAnimationDuration}>
                        <div className='content__header fade-enter'>
                            <h2>{this.props.station_data.station_name} <small>{this.props.station_data.place.city} - {this.props.station_data.place.altitude}m</small></h2>
                            <div className="actions actions-weather">
                                <NetatmoTimer last_status_store={this.props.station_data.last_status_store} locale={this.props.locale}/>
                            </div>
                        </div>
                    </CSSTransition>

                    <div style={{height: '100%'}}>



                    </div>
                </div>
            )
        } else {
            return (
                <div className='loading'>
                    Loading....
                </div>
            )
        }
    }
}

Netatmo.propTypes = {
    loading_station_data: PropTypes.bool.isRequired,
    loading_refresh_token: PropTypes.bool.isRequired,
    station_data: PropTypes.object.isRequired,
    isFetchingNAMain: PropTypes.bool,
    isFetchingNAModule1: PropTypes.bool,
    isFetchingNAModule2: PropTypes.bool,
    isFetchingNAModule3: PropTypes.bool,
    isFetchingNAModule4: PropTypes.bool,
    fetchStationData: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

export default Netatmo
