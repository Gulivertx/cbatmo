import React from 'react';
import removeAccents from 'remove-accents';
import { Button, Colors, Icon, Spinner, Intent, InputGroup } from '@blueprintjs/core';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import {i18n} from 'i18next';
import { Box, Flex } from 'reflexbox';

import { ContextMainLayout } from "../layouts/MainLayout";

import * as applicationActions from '../store/application/actions';
import * as netatmoActions from "../store/netatmo/actions";
import { ConnectedReduxProps } from '../store';
import { IApplicationInfoState } from "../store/application/types";
import { INetatmoUserInformation } from "../models/NetatmoUserInformation";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    loading_station_data: boolean
    info?: IApplicationInfoState
    mobile?: string
    phone?: string
    tablet: string
    user: INetatmoUserInformation
    station_data_errors: any
    refresh_token: string|null
    access_token: string|null
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch extends WithTranslation {
    [key: string]: any
    fetchAuth: typeof netatmoActions.fetchAuth
    fetchStationData: typeof netatmoActions.fetchStationData
    appConfigured: typeof applicationActions.appConfigured
    t: i18next.TFunction
    i18n: i18n
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

interface IState {
    username: string
    password: string
}

class AppStarting extends React.Component<AllProps, IState> {
    state: IState = {
        username: '',
        password: ''
    }

    public componentDidMount(): void {
        if (this.props.refresh_token) {
            this.props.fetchStationData();
        }
    }

    public componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.loading_station_data && prevProps.loading_station_data !== this.props.loading_station_data) {
            if (!this.props.station_data_errors) {
                this.context.addToast('tick-circle', this.props.t('notifications.configuration_success'), Intent.SUCCESS);
                setTimeout(() => this.props.appConfigured(true), 2000);
            } else {
                this.context.addToast('error', this.props.t('notifications.configuration_error'), Intent.DANGER);
            }
        }

        // If the locale change we want to set the lang in localStorage and React app
        if (prevProps.user.lang !== this.props.user.lang && this.props.i18n.language !== this.props.user.lang) {
            console.debug('Change language to', this.props.user.lang);
            window.localStorage.setItem('locale', this.props.user.lang);
            this.props.i18n.changeLanguage(this.props.user.lang)
        }
    }

    private _auth = async () => {
        if (!this.state.username || !this.state.password) {
            this.context.addToast('error', "Please fill username and password", Intent.DANGER);
            return;
        }

        try {
            await this.props.fetchAuth(this.state.username, this.state.password);
        } catch (e) {
            this.context.addToast('error', "Error to login", Intent.DANGER);
        }
    }

    public render() {
        const { info, station_data_errors, refresh_token, mobile } = this.props;

        return (
            <div className="starting-page-layout">
                <div className="content">
                    <h1 className="title">{info?.name}</h1>
                    <h4 style={{ color: Colors.GRAY4 }}>{this.props.t('app_info.version')} {info?.version}</h4>
                    {
                        refresh_token ? (
                            <>
                                <div className="description">{this.props.t('app_info.description')}</div>
                                <div className="loader">
                                    {
                                        station_data_errors ? (
                                            <Icon icon="error" iconSize={60} intent={Intent.DANGER} />
                                        ) : (
                                            <Spinner size={ Spinner.SIZE_STANDARD } intent={Intent.PRIMARY} />
                                        )
                                    }
                                </div>

                                {
                                    station_data_errors ? (
                                        <div>{this.props.t('notifications.configuration_error')}</div>
                                    ) : (
                                        <div>{this.props.t('notifications.loading')}</div>
                                    )
                                }
                            </>
                        ) : (
                            <Flex flexDirection={'column'} width={[ '100%', '30%', '25%' ]} mt={2} px={3}>
                                <InputGroup
                                    leftElement={<Icon icon="user" />}
                                    type={ "text"}
                                    onChange={(e: any) => this.setState({username: e.target.value})}
                                    large={!!this.props.mobile}
                                />
                                <InputGroup
                                    leftElement={<Icon icon="lock" />}
                                    type={ "password"}
                                    onChange={(e: any) => this.setState({password: e.target.value})}
                                    large={!!this.props.mobile}
                                />
                                <Button
                                    style={{width: '100%'}}
                                    onClick={this._auth}
                                    large={!!this.props.mobile}
                                >
                                    Log-in
                                </Button>
                            </Flex>
                        )
                    }
                </div>
                <div className="footer" style={{ color: Colors.GRAY4 }}>
                    {this.props.t('app_info.created_by')} {removeAccents(info?.author as string)}
                </div>
            </div>
        )
    }
}

AppStarting.contextType = ContextMainLayout;

export default withTranslation('common')(AppStarting)
