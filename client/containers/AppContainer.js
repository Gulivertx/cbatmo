import {connect} from 'react-redux'
import * as applicationActions from '../store/application/actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        isConfigured: state.application.isConfigured,
        info: state.application.info,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initApp: () => {
            dispatch(applicationActions.fetchInfo())
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
