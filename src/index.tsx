import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import AppContainer from './containers/AppContainer';

import './css/style.scss';

/** i18n translations **/
import common_en from './i18n/en/common.json';
import common_fr from './i18n/fr/common.json';
import common_de from './i18n/de/common.json';

i18next
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        debug: true,
        resources: {
            en: { common: common_en },
            fr: { common: common_fr },
            de: { common: common_de }
        },
        lng: window.localStorage.getItem('locale') ?  window.localStorage.getItem('locale') as string : 'en',
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common'
    });

/** Register Redux store */
const initialState: any = JSON.parse(window.preloadedState) || {};
import configureStore from './configureStore';
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-root') as HTMLElement
);
