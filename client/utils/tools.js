import moment from "moment/moment";

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

