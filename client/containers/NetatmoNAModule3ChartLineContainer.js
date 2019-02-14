import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_rain,
        data: state.netatmo.measure_rain_data,
        labels: state.netatmo.measure_rain_labels
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchRainMeasure(device, module, type));
        }
    }
};

const NetatmoNAModule3ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule3ChartLineContainer
