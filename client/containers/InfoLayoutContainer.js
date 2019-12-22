import {connect} from 'react-redux'
import * as darkskyActions from '../store/darksky/actions'
import Info from "../layouts/InfoLayout";

const mapStateToProps = state => {
    return {
        darkskyData: state.darksky.data,
        netatmoData: state.netatmo.station_data,
        loading: state.darksky.loading,
        first_fetch: state.darksky.first_fetch,
        info: state.application.info,
        locale: state.application.user.lang
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDarksky: () => {
            dispatch(darkskyActions.fetchDarksky())
        }
    }
};

const InfoLayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Info);

export default InfoLayoutContainer
