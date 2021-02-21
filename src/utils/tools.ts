import moment from "moment";
import {Colors} from "@blueprintjs/core";
import {type, types} from "../apis/netatmo/types";

export const momentWithLocale = (locale: string) => {
    switch (locale) {
        case 'fr':
            require('moment/locale/fr');
            moment.locale('fr');
            break;
        case 'en':
            moment.locale('en');
            break;
        case 'de':
            require('moment/locale/de');
            moment.locale('de');
            break;
        default:
            moment.locale('en');
            break;
    }

    return moment;
};

export const colorChooser = (type: type): string => {
    switch (type) {
        case types.temperature:
            return Colors.GOLD5;
        case types.humidity:
            return Colors.BLUE5;
        case types.co2:
            return Colors.GREEN5;
        case types.noise:
            return Colors.RED5;
        case types.pressure:
            return Colors.COBALT5;
        default:
            console.debug('Unhandled type for color chooser!')
            return Colors.GOLD5;
    }
};
