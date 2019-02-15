import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'loadable-components';
import IdleTimer from 'react-idle-timer';
import Transition from 'react-transition-group/Transition';

/** React components **/
const AppStartingContainer = loadable(() => import('../containers/AppStartingContainer'));
const HomescreenContainer = loadable(() => import('../containers/HomescreenContainer'));
const FirstAppSettingsWelcome = loadable(() => import('./FirstAppSettingsWelcome'));
const FirstAppSettingsNetatmoContainer = loadable(() => import('../containers/FirstAppSettingsNetatmoContainer'));
const NetatmoContainer = loadable(() => import('../containers/NetatmoContainer'));
import ErrorBoundary from './ErrorBoundary';

const DURATION = 800;
const IDLETIMEOUT = 30 * 1000;

const defaultStyle = {
    transition: `opacity ${DURATION}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: {opacity: 0, zIndex: -10},
    entered: {opacity: 1, zIndex: 1000},
    exiting: {opacity: 0, zIndex: 1000},
    exited: {opacity: 0, zIndex: -10}
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.idleTimer = null;
        this.idleTimeout = IDLETIMEOUT;

        this.props.initApp();
    }

    _onActive = (e) => {
        console.debug('User is active', e);
        console.debug('Time remaining', this.idleTimer.getRemainingTime());
        this.props.homescreenOpen(false);
    };

    _onIdle = () => {
        console.debug('User is idle');
        console.debug('Last active', this.idleTimer.getLastActiveTime());
        this.props.homescreenOpen(true);
    };

    render() {
        if (!this.props.isConfigured) {
            switch (this.props.settingsStep) {
                case 1:
                    return (
                        <div className='full-screen'>
                            <div className='background-img'/>
                            <FirstAppSettingsWelcome
                                next={() => this.props.appSettingsStep(2)}
                                appInfo={this.props.info}
                            />
                        </div>
                    );
                case 2:
                    return (
                        <div className='full-screen'>
                            <div className='background-img'/>
                            <FirstAppSettingsNetatmoContainer/>
                        </div>
                    );
                case 3:
                    return (
                        <div className='full-screen'>
                            <div className='background-img'/>
                            <AppStartingContainer/>
                        </div>
                    );
            }
        } else {
            return (
                <IdleTimer
                    ref={ref => {
                        this.idleTimer = ref
                    }}
                    element={document}
                    onActive={this._onActive}
                    onIdle={this._onIdle}
                    timeout={this.idleTimeout}>

                    <Transition in={this.props.isHomeScreenOpen} timeout={DURATION} appear={true} unmountOnExit={true} mountOnEnter={true}>
                        {(state) => (
                            <div className='full-screen background' style={{...defaultStyle, ...transitionStyles[state]}}>
                                <div className='background-img'/>
                                <HomescreenContainer/>
                            </div>
                        )}
                    </Transition>
                    <div className='full-screen'>
                        <div className='background-img'/>
                        <div className="content">
                            <ErrorBoundary>
                                <NetatmoContainer/>
                            </ErrorBoundary>
                        </div>
                    </div>
                </IdleTimer>
            )
        }
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired,
    isConfigured: PropTypes.bool.isRequired,
    isHomeScreenOpen: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    settingsStep: PropTypes.number.isRequired,
    initApp: PropTypes.func.isRequired,
    homescreenOpen: PropTypes.func.isRequired,
    appSettingsStep: PropTypes.func.isRequired
};

export default App