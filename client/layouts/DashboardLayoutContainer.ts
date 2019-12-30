import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as darkskyActions from '../store/darksky/actions'
import * as netatmoActions from '../store/netatmo/actions'
import DashboardLayout from "./DashboardLayout";
import { ApplicationState } from "../store";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    station_data: netatmo.station_data,
    selected_module: netatmo.selected_module,
    selected_types: netatmo.selected_types
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchDarksky: () => dispatch(darkskyActions.fetchDarksky()),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData()),
    fetchMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchMeasure(device, module, type)),
    fetchRainMeasure: (device: string, module: string) => dispatch(netatmoActions.fetchRainMeasure(device, module)),
});

const DashboardLayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardLayout);

export default DashboardLayoutContainer
