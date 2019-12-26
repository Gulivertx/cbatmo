import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleForecast from "../components/ModuleForecast"

const mapStateToProps = ({ darksky}: ApplicationState) => ({
    darksky: darksky
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleForecastContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleForecast);

export default ModuleForecastContainer
