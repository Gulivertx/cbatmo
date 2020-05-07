/**
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
    temperature_ratio: string;
    wind_ratio: number;
    pressure_ratio: number;
}


class NetatmoUserInformation implements INetatmoUserInformation{
    mail: string;
    lang: string;
    locale: string;
    pressure_unit: string;
    unit: string;
    windunit: string;
    temperature_ratio: string;
    wind_ratio: number;
    pressure_ratio: number;

    constructor(data: any) {
        this.mail = data.mail;
        this.locale = data.administrative.reg_locale;

        if (data.administrative.lang.includes('fr')) {
            this.lang = 'fr';
        } else if (data.administrative.lang.includes('de')) {
            this.lang = 'de';
        } else {
            this.lang = 'en';
        }

        switch (data.administrative.pressureunit) {
            case 0:
                this.pressure_unit = 'mbar';
                this.pressure_ratio = 1;
                break;
            case 1:
                this.pressure_unit = 'inHg';
                this.pressure_ratio = 0.02953;
                break;
            case 2:
                this.pressure_unit = 'mmHg';
                this.pressure_ratio = 0.750062;
                break;
            default:
                this.pressure_unit = 'mbar';
                this.pressure_ratio = 1;
                break;
        }

        switch (data.administrative.unit) {
            case 0:
                this.unit = 'si';
                this.temperature_ratio = '1';
                break;
            case 1:
                this.unit = 'us';
                this.temperature_ratio = '9/5 + 32';
                break;
            default:
                this.unit = 'si';
                this.temperature_ratio = '1';
                break;
        }

        switch (data.administrative.windunit) {
            case 0:
                this.windunit = 'km/h';
                this.wind_ratio = 1;
                break;
            case 1:
                this.windunit = 'mp/h';
                this.wind_ratio = 0.621371;
                break;
            case 2:
                this.windunit = 'ms';
                this.wind_ratio = 0.2777778;
                break;
            case 3:
                this.windunit = 'beaufort';
                this.wind_ratio = 1; // TODO
                // Currently not supported : https://www.meteosuisse.admin.ch/content/dam/meteoswiss/fr/Wetter/Prognosen/Wetterbegriffe/Doc/wetter-tabelle-force-des-vents.pdf
                break;
            case 4:
                this.windunit = 'kts';
                this.wind_ratio = 0.5399568;
                break;
            default:
                this.windunit = 'km/h';
                this.wind_ratio = 1;
                break;
        }


        console.debug(this)
    }
}

export default NetatmoUserInformation
