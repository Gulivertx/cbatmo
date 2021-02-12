import moment from "moment";
import {Colors} from "@blueprintjs/core";

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

export const colorChooser = (type: Netatmo.data_type): string => {
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
