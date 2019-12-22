import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartsLine from "../components/NetatmoChartsLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_indoor,
        data: state.netatmo.measure_indoor_data,
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
)(NetatmoChartsLine);

export default NetatmoIndoorChartContainer
