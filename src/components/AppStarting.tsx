import React, {FormEvent} from 'react';
import removeAccents from 'remove-accents';
import { Button, Colors, Icon, Spinner, Intent, InputGroup } from '@blueprintjs/core';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Flex } from 'reflexbox';
import { ContextMainLayout } from "../layouts/MainLayout";
import {PropsFromRedux} from "./AppStarting.container";

interface IState {
    username: string
    password: string
    secret: string
}

class AppStarting extends React.Component<PropsFromRedux & WithTranslation, IState> {
    state: IState = {
        username: '',
        password: '',
        secret: ''
    }

    public componentDidMount(): void {
        if (this.props.isConfigured) {
            this.props.fetchStationData();
        }
    }

    public componentDidUpdate(prevProps: Readonly<PropsFromRedux & WithTranslation>, prevState: Readonly<{}>, snapshot?: any): void {
        // If the locale change we want to set the lang in localStorage and React app
        if (prevProps.user.lang !== this.props.user.lang && this.props.i18n.language !== this.props.user.lang) {
            console.debug('Change language to', this.props.user.lang);
            window.localStorage.setItem('locale', this.props.user.lang);
            this.props.i18n.changeLanguage(this.props.user.lang)
                .catch(error => console.debug(error));
        }
    }

    private _auth = async (e: FormEvent) => {
        e.preventDefault();

        if (!this.state.username || !this.state.password || !this.state.secret) {
            this.context.addToast('error', "Please fill all credential fields", Intent.DANGER);
            return;
        }

        try {
            await this.props.fetchAuth(this.state.username, this.state.password, this.state.secret);
            //this.context.addToast('tick-circle', this.props.t('notifications.configuration_success'), Intent.SUCCESS);
            //this.props.setIsStarting(false);
        } catch (e) {
            this.context.addToast('error', this.props.t('notifications.configuration_error') + '. ' + e.msg, Intent.DANGER);
        }
    }

    public render() {
        const { info, station_data_errors, isConfigured, mobile, loading_auth } = this.props;

        return (
            <div className="starting-page-layout">
                <div className="content">
                    <h1 className="title">{info?.name}</h1>
                    <h4 style={{ color: Colors.GRAY4 }}>{this.props.t('app_info.version')} {info?.version}</h4>
                    {
                        isConfigured ? (
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
                            <Flex flexDirection={'column'} width={[ '100%', '40%', '30%', '20%' ]} mt={2} px={3}>
                                <form onSubmit={this._auth}>
                                    <InputGroup
                                        fill
                                        leftElement={<Icon icon="user" />}
                                        type='email'
                                        onChange={(e: any) => this.setState({username: e.target.value})}
                                        large={!!mobile}
                                        disabled={loading_auth}
                                    />
                                    <InputGroup
                                        fill
                                        leftElement={<Icon icon="lock" />}
                                        type='password'
                                        onChange={(e: any) => this.setState({password: e.target.value})}
                                        large={!!mobile}
                                        disabled={loading_auth}
                                    />
                                    <InputGroup
                                        fill
                                        leftElement={<Icon icon="key" />}
                                        type='password'
                                        onChange={(e: any) => this.setState({secret: e.target.value})}
                                        large={!!mobile}
                                        disabled={loading_auth}
                                    />
                                    <Button
                                        fill
                                        type='submit'
                                        large={!!this.props.mobile}
                                        loading={this.props.loading_auth}
                                    >
                                        Log-in
                                    </Button>
                                </form>
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
