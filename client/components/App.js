import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'loadable-components';
import IdleTimer from 'react-idle-timer';
import Transition from 'react-transition-group/Transition';

/** React components **/
const HomescreenContainer = loadable(() => import('../containers/HomescreenContainer'));
const FirstAppSettingsWelcome = loadable(() => import('./FirstAppSettingsWelcome'));
const FirstAppSettingsNetatmoContainer = loadable(() => import('../containers/FirstAppSettingsNetatmoContainer'));
const FirstAppSettingsDarkskyContainer = loadable(() => import('../containers/FirstAppSettingsDarkskyContainer'));
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
        console.log('User is active', e);
        console.log('Time remaining', this.idleTimer.getRemainingTime());
        this.props.changeHomescreenOpen(false);
    };

    _onIdle = () => {
        console.log('User is idle');
        console.log('Last active', this.idleTimer.getLastActiveTime());
        this.props.changeHomescreenOpen(true);
    };

    render() {
        if (!this.props.isAppConfigured) {
            switch (this.props.appSettingsStep) {
                case 1:
                    return (
                        <div className='full-screen'>
                            <div className='background-img'/>
                            <FirstAppSettingsWelcome
                                next={() => this.props.changeAppSettingsStep(2)}
                                appInfo={this.props.appInfo}
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
                            <FirstAppSettingsDarkskyContainer/>
                        </div>
                    );
            }
        }

        return (
            <IdleTimer
                ref={ref => {
                    this.idleTimer = ref
                }}
                element={document}
                onActive={this._onActive}
                onIdle={this._onIdle}
                timeout={this.idleTimeout}>

                <Transition in={this.props.homeScreenOpen} timeout={DURATION} appear={true} unmountOnExit={true} mountOnEnter={true}>
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

App.propTypes = {
    initApp: PropTypes.func.isRequired,
    isNetatmoAuth: PropTypes.bool,
    isSwissWeatherAuth: PropTypes.bool,
    isLoading: PropTypes.bool,
    isAppConfigured: PropTypes.bool,
    appSettingsStep: PropTypes.number,
    appInfo: PropTypes.object,
    changeAppSettingsStep: PropTypes.func,
    changeHomescreenOpen: PropTypes.func,
    homeScreenOpen: PropTypes.bool
};

export default App