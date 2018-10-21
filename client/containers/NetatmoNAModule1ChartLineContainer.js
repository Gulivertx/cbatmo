import {connect} from 'react-redux'
import * as actions from '../actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetchNAModule1,
        isFetching: state.netatmo.isFetchingNAModule1,
        data: state.netatmo.measureDataNAModule1,
        labels: state.netatmo.measurelabelsNAModule1,
        access_token: state.netatmo.accessToken,
        refresh_token:  state.netatmo.refreshToken,
        expire_in: state.netatmo.expireIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoMeasurenData: (device, module, type) => {
            dispatch(actions.fetchNetatmoNAModule1Measure(device, module, type));
        }
    }
};

const NetatmoNAModule1ChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAModule1ChartLineContainer
