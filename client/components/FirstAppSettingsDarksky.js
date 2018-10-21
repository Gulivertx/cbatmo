import React from 'react';
import PropTypes from "prop-types";

import VirtualKeyboardInput from './VirtualKeyboardInput';

class FirstAppSettingsDarksky extends React.Component {
    state = {
        latInput: '',
        lngInput: '',
        error: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.latInput) return this.setState({error: 'Latitude cannot be blank'});
        if (!this.state.lngInput) return this.setState({error: 'Longitude cannot be blank'});

        this.props.setLatLng(this.state.latInput, this.state.lngInput);
        this.props.changeAppIsConfigured(true);
    };

    render() {
        return (
            <div className="login">
                <div className="login__block toggled" id="l-login">
                    <div className="login__block__header">
                        <i className="zmdi zmdi-sun"/>
                        Dark Sky settings
                        {this.state.error && <div className="text-red">{this.state.error}</div>}
                    </div>

                    <div className="login__block__body">
                        <form onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-group form-group--float form-group--centered form-group--centered">
                                <VirtualKeyboardInput
                                    value={this.state.latInput}
                                    type="text"
                                    className="form-control"
                                    onChange={(value) => { this.setState({latInput: value}) }}
                                    isFirstLetterUppercase={false}
                                />
                                <label>Latitude</label>
                                <i className="form-group__bar"/>
                            </div>

                            <div className="form-group form-group--float form-group--centered form-group--centered">
                                <VirtualKeyboardInput
                                    value={this.state.lngInput}
                                    type="text"
                                    className="form-control"
                                    onChange={(value) => { this.setState({lngInput: value}) }}
                                    isFirstLetterUppercase={false}
                                />
                                <label>Longitude</label>
                                <i className="form-group__bar"/>
                            </div>

                            <button className="btn btn-dark">Next</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

FirstAppSettingsDarksky.propType = {
    changeAppIsConfigured: PropTypes.func.isRequired,
    setLatLng: PropTypes.func.isRequired,
};

export default FirstAppSettingsDarksky