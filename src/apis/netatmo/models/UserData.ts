import {Administrative, User} from "../interfaces/ApiStationData";

class UserData {
    public mail: string
    public locale: string
    public lang!: string
    public pressure_unit!: string
    public unit!: string
    public temperature_unit!: string
    public distance_unit!: string
    public wind_unit!: string
    public temperature_ratio!: string
    public wind_ratio!: number
    public pressure_ratio!: number
    public rain_ratio!: number

    constructor(data: User) {
        this.mail = data.mail;
        this.locale = data.administrative.reg_locale;
        this.setUserLanguage(data.administrative);
        this.setUnits(data.administrative);

        console.debug(this)
    }

    private setUserLanguage = (administrative: Administrative): void => {
        console.log(administrative.lang.substr(0, 2))
        switch (administrative.lang.substr(0, 2)) {
            case 'fr':
            case 'de':
                this.lang = administrative.lang.substr(0, 2);
                break;
            default:
                this.lang = 'en';
                break;
        }
    }

    private setUnits = (administrative: Administrative): void => {
        switch (administrative.pressureunit) {
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

        switch (administrative.unit) {
            case 0:
                this.unit = 'si';
                this.temperature_unit = 'C';
                this.distance_unit = 'mm';
                this.temperature_ratio = '1';
                this.rain_ratio = 1;
                break;
            case 1:
                this.unit = 'us';
                this.temperature_unit = 'F';
                this.distance_unit = 'in';
                this.temperature_ratio = '9/5 + 32';
                this.rain_ratio = 25.4;
                break;
            default:
                this.unit = 'si';
                this.temperature_unit = 'C';
                this.distance_unit = 'mm';
                this.temperature_ratio = '1';
                this.rain_ratio = 1;
                break;
        }

        switch (administrative.windunit) {
            case 0:
                this.wind_unit = 'km/h';
                this.wind_ratio = 1;
                break;
            case 1:
                this.wind_unit = 'mp/h';
                this.wind_ratio = 0.621371;
                break;
            case 2:
                this.wind_unit = 'ms';
                this.wind_ratio = 0.2777778;
                break;
            case 3:
                this.wind_unit = 'beaufort';
                this.wind_ratio = 1; // TODO
                // Currently not supported : https://www.meteosuisse.admin.ch/content/dam/meteoswiss/fr/Wetter/Prognosen/Wetterbegriffe/Doc/wetter-tabelle-force-des-vents.pdf
                break;
            case 4:
                this.wind_unit = 'kts';
                this.wind_ratio = 0.5399568;
                break;
            default:
                this.wind_unit = 'km/h';
                this.wind_ratio = 1;
                break;
        }
    }
}

export default UserData
