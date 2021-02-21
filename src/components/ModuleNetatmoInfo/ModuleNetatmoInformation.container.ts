import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoInformation from "./ModuleNetatmoInformation"
import * as netatmoActions from "../../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    home_name: netatmo.station_data?.home_name,
    last_status_store: netatmo.station_data?.last_status_store,
    place: netatmo.station_data?.place,
    reachable: netatmo.station_data?.main_data.reachable,
    locale: application.user?.lang,
    orientation: application.orientation,
    netatmo_devices: application.netatmo_devices,
    selected_device: netatmo.selected_device
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    onChangeSelectedDevice: (deviceId: string) => dispatch(netatmoActions.onChangeSelectedDevice(deviceId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoInformationContainer = connector(ModuleNetatmoInformation);

export default ModuleNetatmoInformationContainer
