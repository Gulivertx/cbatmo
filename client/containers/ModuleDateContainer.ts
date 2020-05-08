import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleDate from "../components/ModuleDate"

const mapStateToProps = ({ application}: ApplicationState) => ({
    locale: application.user.lang
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleDateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleDate);

export default ModuleDateContainer
