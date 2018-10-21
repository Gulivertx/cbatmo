import {connect} from 'react-redux'
import * as actions from '../actions'
import FirstAppSettingsDarksky from "../components/FirstAppSettingsDarksky";

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeAppIsConfigured: (bool) => {
            dispatch(actions.changeAppIsConfigured(bool));
        },
        setLatLng: (lat, lng) => {
            dispatch(actions.setLatLng(lat, lng));
        }
    }
};

const FirstAppSettingsDarkskyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstAppSettingsDarksky);

export default FirstAppSettingsDarkskyContainer
