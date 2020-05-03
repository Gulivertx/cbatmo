import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleForecast from "../components/ModuleForecast"

const mapStateToProps = ({ openweather, application}: ApplicationState) => ({
    openweather: openweather,
    locale: application.user.lang,
    phone: application.phone
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleForecastContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleForecast);

export default ModuleForecastContainer
