import moment from "moment/moment";
import {Colors} from "@blueprintjs/core";

/**
 * Set locale for momentjs
 * @param locale
 * @return moment
 */
export const momentWithLocale = (locale) => {
    switch (locale) {
        case 'fr':
            require('moment/locale/fr');
            moment.locale('fr');
            break;
        case 'en':
            moment.locale('en');
            break;
        default:
            moment.locale('en');
    }

    return moment;
};

/**
 * @param color
 * @return string
 */
export const colorSelector = (color) => {
    switch (color) {
        case 'yellow':
            color = Colors.GOLD4;
            break;
        case 'blue':
            color = Colors.BLUE5;
            break;
        case 'red':
            color = Colors.RED5;
            break;
        case 'purpule':
            color = Colors.SEPIA1;
            break;
        case 'green':
            color = Colors.GREEN5;
            break;
        case 'cyan':
            color = Colors.COBALT5;
            break;
        case 'white':
            color = Colors.WHITE;
            break;
    }

    return color;
};

/**
 * @param status
 * @return string
 */
export const setWifiStatusIcon = (status) => {
    switch (status) {
        case 'bad':
            return 'header-icon mdi mdi-wifi-strength-1';
        case 'average':
            return 'header-icon mdi mdi-wifi-strength-2';
        case 'good':
            return 'header-icon mdi mdi-wifi-strength-4'
    }
};

/**
 * @param status
 * @return {string}
 */
export const setRadioStatusIcon = (status) => {
    switch (status) {
        case 'very-low':
            return 'header-icon mdi mdi-network-strength-1';
        case 'low':
            return 'header-icon mdi mdi-network-strength-2';
        case 'medium':
            return 'header-icon mdi mdi-network-strength-3';
        case 'high':
            return 'header-icon mdi mdi-network-strength-4';
    }
};

/**
 * @param status
 * @return {string}
 */
export const setBatteryStatusIcon = (status) => {
    switch (status) {
        case 'very-low':
            return 'header-icon mdi mdi-battery-10';
        case 'low':
            return 'header-icon mdi mdi-battery-30';
        case 'medium':
            return 'header-icon mdi mdi-battery-50';
        case 'high':
            return 'header-icon mdi mdi-battery-70';
        case 'full':
            return 'header-icon mdi mdi-battery-90';
        case 'max':
            return 'header-icon mdi mdi-battery';

    }
};

