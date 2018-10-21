import {connect} from 'react-redux'
import * as actions from '../actions'
import Settings from "../components/Settings";

const mapStateToProps = state => {
    return {
        step: state.settings.step,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default SettingsContainer
