import {connect} from 'react-redux'
import * as darkskyActions from '../store/darksky/actions'
import InfoLayout from "../layouts/InfoLayout";

const mapStateToProps = state => {
    return {
        darkskyData: state.darksky.data,
        netatmoData: state.netatmo.station_data,
        loading: state.darksky.loading,
        first_fetch: state.darksky.first_fetch,
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
)(InfoLayout);

export default InfoLayoutContainer
