import * as React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import AppContainer from './components/App.container';

import './css/style.scss';

/** i18n translations **/
import common_en from './i18n/en/common.json';
import common_fr from './i18n/fr/common.json';
import common_de from './i18n/de/common.json';

import configureStore from './configureStore';

window.addEventListener("DOMContentLoaded", (event) => {
    i18next
        .use(initReactI18next)
        .init({
            interpolation: { escapeValue: false },
            debug: false,
            resources: {
                en: { common: common_en },
                fr: { common: common_fr },
                de: { common: common_de }
            },
            lng: window.localStorage.getItem('locale') ?  window.localStorage.getItem('locale') as string : 'en',
            fallbackLng: 'en',
            ns: ['common'],
            defaultNS: 'common'
        })
        .then(() => console.debug('Translator support loaded...'));

    /** Register Redux store */
    const initialState: any = JSON.parse(window.preloadedState) || {};
    const store = configureStore(initialState);

    const renderApp = async (id: string): Promise<void> => {
        ReactDOM.render(
            <Provider store={store}>
                <AppContainer />
            </Provider>,
            document.getElementById(id) as HTMLElement
        );
    }

    (() => {
        const el = document.getElementById('app-root');
        if (el !== null) renderApp(el.id).then(() => console.debug('App loaded...'));
    })();
});
