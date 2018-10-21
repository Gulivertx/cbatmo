import {connect} from 'react-redux'
import * as actions from '../actions'
import Netatmo from "../components/Netatmo";

const mapStateToProps = state => {
    return {
        isFirstFetch: state.netatmo.isFirstFetch,
        isFetchingStation: state.netatmo.isFetchingStation,
        isFetchingRefreshToken: state.netatmo.isFetchingRefreshToken,
        isFetchingNAMain: state.netatmo.isFetchingNAMain,
        isFetchingNAModule1: state.netatmo.isFetchingNAModule1,
        isFetchingNAModule2: state.netatmo.isFetchingNAModule2,
        isFetchingNAModule3: state.netatmo.isFetchingNAModule3,
        isFetchingNAModule4: state.netatmo.isFetchingNAModule4,
        stationData: state.netatmo.stationData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoStationData: () => {
            dispatch(actions.fetchNetatmoStation());
        }
    }
};

const NetatmoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Netatmo);

export default NetatmoContainer
