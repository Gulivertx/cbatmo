import {connect} from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import {ApplicationState} from "../store";
import App from "../components/App"

const mapStateToProps = ({ application}: ApplicationState) => ({
    isConfigured: application.isConfigured
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
