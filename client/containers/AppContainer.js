import {connect} from 'react-redux'
import * as applicationActions from '../store/application/actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        loading: state.application.loading,
        isConfigured: state.application.isConfigured,
        isHomeScreenOpen: state.application.isHomeScreenOpen,
        info: state.application.info,
        settingsStep: state.application.settingsStep
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initApp: () => {
            dispatch(applicationActions.fetchInfo())
        },
        homescreenOpen: (bool) => {
            dispatch(applicationActions.homescreenOpen(bool))
        },
        appSettingsStep: (step) => {
            dispatch(applicationActions.settingsStep(step))
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
