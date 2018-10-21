import {connect} from 'react-redux'
import * as actions from '../actions'
import NetatmoChartLine from "../components/NetatmoChartLine";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetchNAMain,
        isFetching: state.netatmo.isFetchingNAMain,
        data: state.netatmo.measureDataNAMain,
        labels: state.netatmo.measureLabelsNAMain,
        access_token: state.netatmo.accessToken,
        refresh_token:  state.netatmo.refreshToken,
        expire_in: state.netatmo.expireIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoMeasurenData: (device, module, type) => {
            dispatch(actions.fetchNetatmoNAMainMeasure(device, module, type));
        }
    }
};

const NetatmoNAMainChartLineContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetatmoChartLine);

export default NetatmoNAMainChartLineContainer
