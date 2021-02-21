import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleForecast from "./ModuleForecast"

const mapStateToProps = ({ openweather, application}: ApplicationState) => ({
    openweather: openweather,
    locale: application.user?.lang,
    phone: application.phone,
    orientation: application.orientation
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleForecastContainer = connector(ModuleForecast);

export default ModuleForecastContainer
