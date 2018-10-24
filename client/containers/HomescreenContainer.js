import {connect} from 'react-redux'
import * as actions from '../actions'
import Homescreen from "../components/Homescreen";

const mapStateToProps = state => {
    return {
        darkskyData: state.darksky.data,
        netatmoData: state.netatmo.stationData,
        darkskyIsFirstFetch: state.darksky.isFirstFetch,
        netatmoIsFirstFetch: state.netatmo.isFirstFetch,
        appInfo: state.main.appInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDarksky: () => {
            dispatch(actions.fetchDarksky())
        }
    }
};

const HomescreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homescreen);

export default HomescreenContainer
