import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_outdoor,
        data: state.netatmo.measure_outdoor_data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchoutdoorMeasure(device, module, type));
        }
    }
};

const NetatmoOutdoorChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoOutdoorChartContainer
