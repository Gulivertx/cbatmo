import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleDate from "../components/ModuleDate"

const mapStateToProps = ({ darksky, application}: ApplicationState) => ({
    moon_phase: darksky.data?.daily.data[0].moon_phase,
    locale: application.user.lang
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleDateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleDate);

export default ModuleDateContainer
