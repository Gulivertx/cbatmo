import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@blueprintjs/core';

/** React layouts **/
import MainLayout from "../layouts/MainLayout";

/** React components **/
import AppStartingContainer from "../containers/AppStartingContainer";
import NetatmoContainer from "../containers/NetatmoContainer";
import InfoLayoutContainer from "../containers/InfoLayoutContainer";
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.initApp();
    }

    render() {
        return (
            <MainLayout>
                {
                    this.props.isConfigured ? [
                        <InfoLayoutContainer key="info" />,
                        <Divider key="separator" />,
                        <ErrorBoundary key="content">
                            <NetatmoContainer />
                        </ErrorBoundary>
                    ] : (
                        <AppStartingContainer />
                    )
                }
            </MainLayout>
        )
    }
}

App.propTypes = {
    isConfigured: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    initApp: PropTypes.func.isRequired,
};

export default App
