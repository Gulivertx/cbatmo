import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as darkskyActions from '../store/darksky/actions'
import * as netatmoActions from '../store/netatmo/actions'
import DashboardLayout from "./DashboardLayout";
import { ApplicationState } from "../store";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    station_data: netatmo.station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchDarksky: () => dispatch(darkskyActions.fetchDarksky()),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData()),
    fetchMainMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchMainMeasure(device, module, type)),
    fetchIndoorMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchIndoorMeasure(device, module, type)),
    fetchOutdoorMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchOutdoorMeasure(device, module, type)),
    fetchRainMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchRainMeasure(device, module, type)),
    fetchWindMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchWindMeasure(device, module, type))
});

const DashboardLayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardLayout);

export default DashboardLayoutContainer
