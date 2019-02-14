import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_outdoor,
        data: state.netatmo.measure_outdoor_data,
        labels: state.netatmo.measure_outdoor_labels
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchoutdoorMeasure(device, module, type));
        }
    }
};

const NetatmoNAModule1ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule1ChartLineContainer
