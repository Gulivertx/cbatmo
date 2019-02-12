import {connect} from 'react-redux'
import * as actions from '../store/netatmo/actions'
import FirstAppSettingsNetatmo from "../components/FirstAppSettingsNetatmo";

const mapStateToProps = state => {
    return {
        auth_errors: state.netatmo.auth_errors,
        loading_auth: state.netatmo.loading_auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAuth: (email, password) => {
            dispatch(actions.fetchAuth(email, password));
        }
    }
};

const FirstAppSettingsNetatmoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstAppSettingsNetatmo);

export default FirstAppSettingsNetatmoContainer
