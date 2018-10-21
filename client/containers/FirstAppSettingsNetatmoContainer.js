import {connect} from 'react-redux'
import * as actions from '../actions'
import FirstAppSettingsNetatmo from "../components/FirstAppSettingsNetatmo";

const mapStateToProps = state => {
    return {
        authResult: state.netatmo.authResult,
        isFetchingAuth: state.netatmo.isFetchingAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNetatmoAuth: (email, password) => {
            dispatch(actions.fetchNetatmoAuth(email, password));
        }
    }
};

const FirstAppSettingsNetatmoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstAppSettingsNetatmo);

export default FirstAppSettingsNetatmoContainer
