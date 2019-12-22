import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import NetatmoChartsLine from "../components/NetatmoChartsLine";

const mapStateToProps = state => {
    return {
        loading: state.netatmo.loading_main,
        data: state.netatmo.measure_main_data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMeasureData: (device, module, type) => {
            dispatch(netatmoActions.fetchMainMeasure(device, module, type));
        }
    }
};

const NetatmoMainModuleChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartsLine);

export default NetatmoMainModuleChartContainer
