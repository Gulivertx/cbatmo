import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartBar from "../components/NetatmoChartBar";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_rain,
        data: state.netatmo.measure_rain_data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchRainMeasure(device, module, type));
        }
    }
};

const NetatmoRainChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartBar);

export default NetatmoRainChartContainer
