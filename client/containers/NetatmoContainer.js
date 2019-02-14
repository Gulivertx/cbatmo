import {connect} from 'react-redux'
import * as netatmoActions from '../store/netatmo/actions'
import Netatmo from "../components/Netatmo";

const mapStateToProps = state => {
    return {
        loading_station_data: state.netatmo.loading_station_data,
        loading_refresh_token: state.netatmo.loading_refresh_token,
        station_data: state.netatmo.station_data,
        station_data_errors: state.netatmo.station_data_errors,
        locale: state.application.user.lang
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStationData: () => {
            dispatch(netatmoActions.fetchStationData());
        }
    }
};

const NetatmoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Netatmo);

export default NetatmoContainer
