import React from 'react';
import PropTypes from "prop-types";
import Transition from 'react-transition-group/Transition';

import HomescreenDateTime from './HomescrrenDateTime';
import HomescreenWeather from './HomescreenWeather';
import HomescrrenAppInfo from './HomescrrenAppInfo';
import ErrorBoundary from './ErrorBoundary';

const duration = 500;

const defaultStyle = {
    transition: `opacity ${duration}ms`,
    opacity: 0,
};

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

const intervalMinutes = 10, refreshTime = intervalMinutes * 60 * 1000;

class Homescreen extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetchDarksky();
    }

    state = {
        startAnimation: false
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.fetchDarksky();
        }, refreshTime);

        setTimeout(() => {
            this.setState({startAnimation: true})
        }, 800)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Transition in={this.state.startAnimation} timeout={duration} appear={true} unmountOnExit={true} mountOnEnter={true}>
                {(state) => (
                    <div className='full-screen' style={{...defaultStyle, ...transitionStyles[state]}}>
                        <HomescrrenAppInfo appInfo={this.props.info}/>
                        <HomescreenDateTime locale={this.props.locale}/>
                        <ErrorBoundary>
                            {
                                !this.props.first_fetch && (
                                    <HomescreenWeather darkskyData={this.props.darkskyData} netatmoData={this.props.netatmoData} locale={this.props.locale}/>
                                )
                            }
                        </ErrorBoundary>
                    </div>
                )}
            </Transition>
        )
    }
};

Homescreen.propTypes = {
    darkskyData: PropTypes.object,
    netatmoData: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    first_fetch: PropTypes.bool.isRequired,
    fetchDarksky: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};

export default Homescreen;