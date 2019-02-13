import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_main,
        data: state.netatmo.measure_main_data,
        labels: state.netatmo.measure_main_labels
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasurenData: (device, module, type) => {
            dispatch(netatmoActions.fetchMainMeasure(device, module, type));
        }
    }
};

const NetatmoNAMainChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAMainChartLineContainer
