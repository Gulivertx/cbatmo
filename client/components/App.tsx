import React from 'react';
import { Divider } from '@blueprintjs/core';

/** React layouts **/
import MainLayout from '../layouts/MainLayout';

/** React components **/
import AppStartingContainer from "../containers/AppStartingContainer";
import NetatmoContainer from "../containers/NetatmoContainer";
import InfoLayoutContainer from "../containers/InfoLayoutContainer";
import ErrorBoundary from './ErrorBoundary';
import { ConnectedReduxProps } from '../store';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    isConfigured: boolean
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

class App extends React.Component<AllProps> {
    public render() {
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

export default App
