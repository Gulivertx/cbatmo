import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_indoor,
        data: state.netatmo.measure_indoor_data,
        labels: state.netatmo.measure_indoor_labels
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchIndoorMeasure(device, module, type));
        }
    }
};

const NetatmoIndoorChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoIndoorChartContainer
