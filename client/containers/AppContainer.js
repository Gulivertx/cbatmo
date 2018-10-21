import {connect} from 'react-redux'
import * as actions from '../actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        isNetatmoAuth: state.main.isNetatmoAuth,
        isSwissWeatherAuth: state.main.isSwissWeatherAuth,
        isLoading: state.main.isLoading,
        isAppConfigured: state.main.isAppConfigured,
        appSettingsStep: state.main.appSettingsStep,
        homeScreenOpen: state.main.homeScreenOpen,
        appInfo: state.main.appInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initApp: () => {
            dispatch(actions.fetchAppInfo())
        },
        changeAppSettingsStep: (step) => {
            dispatch(actions.changeAppSettingsStep(step))
        },
        changeHomescreenOpen: (bool) => {
            dispatch(actions.changeHomescreenOpen(bool))
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
