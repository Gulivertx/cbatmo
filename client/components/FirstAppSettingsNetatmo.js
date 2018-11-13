import React from 'react';
import PropTypes from "prop-types";

import VirtualKeyboardInput from './VirtualKeyboardInput';

class FirstAppSettingsNetatmo extends React.Component {
    state = {
        nameInput: '',
        passwordInput: '',
        error: ''
    };

    componentDidUpdate(prevProps) {
        if (this.props.authResult !== prevProps.authResult) {
            this.props.authResult.error && this.setState({error: this.props.authResult.error})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.nameInput) return this.setState({error: 'Email cannot be blank'});
        if (!this.state.passwordInput) return this.setState({error: 'Password cannot be blank'});

        this.props.fetchNetatmoAuth(this.state.nameInput, this.state.passwordInput);
    };

    render() {
        return (
            <div className="login">
                <div className="login__block toggled" id="l-login">
                    <div className="login__block__header">
                        <i className="zmdi zmdi-sun"/>
                        Connect your Netatmo station
                        {this.state.error && <div className="text-red">{this.state.error}</div>}
                    </div>

                    <div className="login__block__body">
                        <form onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-group form-group--float form-group--centered form-group--centered">
                                <VirtualKeyboardInput
                                    value={this.state.nameInput}
                                    type="text"
                                    className="form-control"
                                    onChange={(value) => { this.setState({nameInput: value}) }}
                                    isFirstLetterUppercase={false}
                                />
                                <label>Email</label>
                                <i className="form-group__bar"/>
                            </div>

                            <div className="form-group form-group--float form-group--centered form-group--centered">
                                <VirtualKeyboardInput
                                    value={this.state.passwordInput}
                                    type="password"
                                    className="form-control"
                                    onChange={(value) => { this.setState({passwordInput: value}) }}
                                />
                                <label>Password</label>
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

FirstAppSettingsNetatmo.propType = {
    authResult: PropTypes.object,
    isFetchingAuth: PropTypes.bool.isRequired,
    fetchNetatmoAuth: PropTypes.func.isRequired,
};

export default FirstAppSettingsNetatmo