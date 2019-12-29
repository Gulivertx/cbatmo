import moment from "moment";
import {Types} from "../models/NetatmoChartsData";
import {Colors} from "@blueprintjs/core";

/**
 * Set locale for momentjs
 * @param locale
 * @return moment
 */
export const momentWithLocale = (locale: string) => {
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
            break;
    }

    return moment;
};

/**
 * @param type
 */
export const colorChooser = (type: Types): string => {
    switch (type) {
        case 'Temperature':
            return Colors.GOLD5;
        case 'Humidity':
            return Colors.BLUE5;
        case 'CO2':
            return Colors.GREEN5;
        case 'Noise':
            return Colors.RED5;
        case 'Pressure':
            return Colors.COBALT5;
    }
};

/**
 * @param status
 * @return string
 */
export const setWifiStatusIcon = (status: 'bad'|'average'|'good'): string => {
    switch (status) {
        case 'bad':
            return 'mdi mdi-wifi-strength-1';
        case 'average':
            return 'mdi mdi-wifi-strength-2';
        case 'good':
            return 'mdi mdi-wifi-strength-4'
    }
};

/**
 * @param status
 * @return string
 */
export const setRadioStatusIcon = (status: 'very-low'|'low'|'medium'|'high'): string => {
    switch (status) {
        case 'very-low':
            return 'mdi mdi-network-strength-1';
        case 'low':
            return 'mdi mdi-network-strength-2';
        case 'medium':
            return 'mdi mdi-network-strength-3';
        case 'high':
            return 'mdi mdi-network-strength-4';
    }
};

/**
 * @param status
 * @return string
 */
export const setBatteryStatusIcon = (status: 'very-low'|'low'|'medium'|'high'|'full'|'max') => {
    switch (status) {
        case 'very-low':
            return 'mdi mdi-battery-10';
        case 'low':
            return 'mdi mdi-battery-30';
        case 'medium':
            return 'mdi mdi-battery-50';
        case 'high':
            return 'mdi mdi-battery-70';
        case 'full':
            return 'mdi mdi-battery-90';
        case 'max':
            return 'mdi mdi-battery';

    }
};

