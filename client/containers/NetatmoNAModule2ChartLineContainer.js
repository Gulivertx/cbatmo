import {connect} from 'react-redux'
import * as actions from '../actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetchNAModule2,
        isFetching: state.netatmo.isFetchingNAModule2,
        data: state.netatmo.measureDataNAModule2,
        labels: state.netatmo.measurelabelsNAModule2,
        access_token: state.netatmo.accessToken,
        refresh_token:  state.netatmo.refreshToken,
        expire_in: state.netatmo.expireIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoMeasurenData: (device, module, type) => {
            dispatch(actions.fetchNetatmoNAModule2Measure(device, module, type));
        }
    }
};

const NetatmoNAModule2ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule2ChartLineContainer
