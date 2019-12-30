/**
 * Netatmo User information DTO
 *
 * unit : 0 -> metric system, 1 -> imperial system
 * windunit: 0 -> kph, 1 -> mph, 2 -> ms, 3 -> beaufort, 4 -> knot
 * pressureunit: 0 -> mbar, 1 -> inHg, 2 -> mmHg
 * lang: user locale
 * reg_locale: user regional preferences (used for displaying date)
 * feel_like: algorithm used to compute feel like temperature, 0 -> humidex, 1 -> heat-index
 */

export interface INetatmoUserInformation {
    mail: string
    lang: string
    locale: string
    pressure_unit: string
    unit: string
    windunit: string
}


class NetatmoUserInformation implements INetatmoUserInformation{
    mail: string;
    lang: string;
    locale: string;
    pressure_unit: string;
    unit: string;
    windunit: string;

    constructor(data: any) {
        this.mail = data.mail;
        this.lang = data.administrative.lang.includes('fr') ? 'fr' : 'en';
        this.locale = data.administrative.reg_locale;

        switch (data.administrative.pressureunit) {
            case 0:
                this.pressure_unit = 'mbar';
                break;
            case 1:
                this.pressure_unit = 'inHg';
                break;
            case 2:
                this.pressure_unit = 'mmHg';
                break;
            default:
                this.pressure_unit = 'mbar';
                break;
        }

        switch (data.administrative.unit) {
            case 0:
                this.unit = 'si';
                break;
            case 1:
                this.unit = 'us';
                break;
            default:
                this.unit = 'si';
                break;
        }

        switch (data.administrative.windunit) {
            case 0:
                this.windunit = 'km/h';
                break;
            case 1:
                this.windunit = 'mp/h';
                break;
            case 2:
                this.windunit = 'ms';
                break;
            case 3:
                this.windunit = 'beaufort';
                break;
            case 4:
                this.windunit = 'knot';
                break;
            default:
                this.windunit = 'km/h';
                break;
        }


        console.debug(this)
    }
}

export default NetatmoUserInformation
