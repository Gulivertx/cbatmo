import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as darkskyActions from '../store/darksky/actions'
import * as netatmoActions from '../store/netatmo/actions'
import DashboardLayout from "./DashboardLayout";

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchDarksky: () => dispatch(darkskyActions.fetchDarksky()),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData())
});

const DashboardLayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardLayout);

export default DashboardLayoutContainer
