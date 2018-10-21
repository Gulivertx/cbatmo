import {connect} from 'react-redux'
import * as actions from '../actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetchNAModule3,
        isFetching: state.netatmo.isFetchingNAModule3,
        data: state.netatmo.measureDataNAModule3,
        labels: state.netatmo.measurelabelsNAModule3,
        access_token: state.netatmo.accessToken,
        refresh_token:  state.netatmo.refreshToken,
        expire_in: state.netatmo.expireIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoMeasurenData: (device, module, type) => {
            dispatch(actions.fetchNetatmoNAModule3Measure(device, module, type));
        }
    }
};

const NetatmoNAModule3ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule3ChartLineContainer
