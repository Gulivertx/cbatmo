import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_wind,
        data: state.netatmo.measure_wind_data,
        labels: state.netatmo.measure_wind_labels
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasurenData: (device, module, type) => {
            dispatch(netatmoActions.fetchWindMeasure(device, module, type));
        }
    }
};

const NetatmoNAModule2ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule2ChartLineContainer
