import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import ModuleNetatmoGraph from "../components/ModuleNetatmoGraph";
import {ApplicationState} from "../store";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    measure_data: netatmo.measure_data,
    selected_types: netatmo.selected_types,
    selected_module: netatmo.selected_module,
    station_data: netatmo.station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoRainGraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoGraph);

export default ModuleNetatmoRainGraphContainer
