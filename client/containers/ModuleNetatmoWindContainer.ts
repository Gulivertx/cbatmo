import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoWind from "../components/ModuleNetatmoWind"
import * as netatmoActions from "../store/netatmo/actions";
import {Scale} from "../models/NetatmoChartsData";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.WIND,
    device_id: netatmo.station_data?.id,
    unit: application.user.windunit
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], hours?: number, scale?: Scale) => dispatch(netatmoActions.fetchMeasure(device, module, type, hours, scale))
});

const ModuleNetatmoWindContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoWind);

export default ModuleNetatmoWindContainer
