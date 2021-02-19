import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleDateTime from "./ModuleDateTime"

const mapStateToProps = ({ openweather, application}: ApplicationState) => ({
    sunset_time: openweather.data?.daily.data[0].sunset_time,
    sunrise_time: openweather.data?.daily.data[0].sunrise_time,
    locale: application.user.lang,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleDateTimeContainer = connector(ModuleDateTime);

export default ModuleDateTimeContainer
