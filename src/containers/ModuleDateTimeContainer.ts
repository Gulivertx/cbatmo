import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleDateTime from "../components/ModuleDateTime"

const mapStateToProps = ({ openweather, application}: ApplicationState) => ({
    sunset_time: openweather.data?.daily.data[0].sunset_time,
    sunrise_time: openweather.data?.daily.data[0].sunrise_time,
    locale: application.user.lang,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleDateTimeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleDateTime);

export default ModuleDateTimeContainer
