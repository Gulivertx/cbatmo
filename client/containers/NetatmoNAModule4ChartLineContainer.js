import {connect} from 'react-redux'
import * as actions from '../actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetchNAModule4,
        isFetching: state.netatmo.isFetchingNAModule4,
        data: state.netatmo.measureDataNAModule4,
        labels: state.netatmo.measurelabelsNAModule4,
        access_token: state.netatmo.accessToken,
        refresh_token:  state.netatmo.refreshToken,
        expire_in: state.netatmo.expireIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoMeasurenData: (device, module, type) => {
            dispatch(actions.fetchNetatmoNAModule4Measure(device, module, type));
        }
    }
};

const NetatmoNAModule4ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule4ChartLineContainer
