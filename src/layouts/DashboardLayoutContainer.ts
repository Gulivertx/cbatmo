import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as openweatherActions from '../store/openweather/actions'
import * as netatmoActions from '../store/netatmo/actions'
import * as applicationActions from '../store/application/actions'
import DashboardLayout from "./DashboardLayout";
import { ApplicationState } from "../store";
import {Orientation} from "../store/application/types";
import {DataTypes} from "../types/netatmo";

const mapStateToProps = ({ netatmo, application }: ApplicationState) => ({
    station_data: netatmo.station_data,
    selected_module: netatmo.selected_module,
    selected_types: netatmo.selected_types,
    selected_station_type: netatmo.selected_station_type,
    selected_outdoor_type: netatmo.selected_outdoor_type,
    selected_indoor_type: netatmo.selected_indoor_type,
    selected_indoor_second_type: netatmo.selected_indoor_second_type,
    selected_indoor_third_type: netatmo.selected_indoor_third_type,
    selected_timelapse: netatmo.selected_timelapse,
    mobile: application.mobile
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchOpenWeather: () => dispatch(openweatherActions.fetchOpenWeather()),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData()),
    fetchMeasure: (device: string, module: string, types: string[], timelapse: '12h'|'1d'|'1m') => dispatch(netatmoActions.fetchMeasure(device, module, types, timelapse)),
    fetchMeasures: (device: string, module: string, types: DataTypes[], timelapse: '12h'|'1d'|'1m', module_name: string) => dispatch(netatmoActions.fetchMeasures(device, module, types, timelapse, module_name)),
    fetchRainMeasure: (device: string, module: string) => dispatch(netatmoActions.fetchRainMeasure(device, module)),
    setOrientation: (orientation: Orientation) => dispatch(applicationActions.setOrientation(orientation)),
});

const DashboardLayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardLayout);

export default DashboardLayoutContainer
