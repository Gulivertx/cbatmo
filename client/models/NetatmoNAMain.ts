import NetatmoNAModule1, {INetatmoNAModule1} from "./NetatmoNAModule1";
import NetatmoNAModule4, {INetatmoNAModule4} from "./NetatmoNAModule4";
import NetatmoNAModule3, {INetatmoNAModule3} from "./NetatmoNAModule3";
import NetatmoNAModule2, {INetatmoNAModule2} from "./NetatmoNAModule2";
import NetatmoUserInformation, {INetatmoUserInformation} from "./NetatmoUserInformation";
import {Types} from "./NetatmoChartsData";

export enum MODULE_TYPE {
    MAIN = 'NAMain',
    INDOOR = 'NAModule4',
    INDOOR_SECOND = 'NAModule4',
    INDOOR_THIRD = 'NAModule4',
    OUTDOOR = 'NAModule1',
    RAIN = 'NAModule3',
    WIND = 'NAModule2'
}

export interface INetatmoNAMain {
    id: string
    type: string
    last_status_store: number
    module_name: string
    wifi_status: string
    wifi: string
    reachable: boolean
    station_name: string
    data_type: Types[]
    place: IPlace
    data: IData|undefined
    available_modules: IAvailableModules
    number_of_additional_modules: number // Additional modules counter (without station and outdoor module)
    modules: IModule
}

export interface IPlace {
    altitude: number
    city: string
    country: string
    timezone: string
    latitude: number
    longitude: number
}

export interface IData {
    temperature: number
    co2: number
    humidity: number
    noise: number
    pressure: number
    absolute_pressure: number
    min_temp: number
    max_temp: number
    temp_trend: string
    pressure_trend: string
}

export interface IAvailableModules {
    OUTDOOR: boolean
    INDOOR: boolean
    INDOOR_SECOND: boolean
    INDOOR_THIRD: boolean
    RAIN: boolean
    WIND: boolean
}

export interface IModule {
    OUTDOOR: INetatmoNAModule1|undefined,
    INDOOR: INetatmoNAModule4|undefined,
    INDOOR_SECOND: INetatmoNAModule4|undefined,
    INDOOR_THIRD: INetatmoNAModule4|undefined,
    RAIN: INetatmoNAModule3|undefined,
    WIND: INetatmoNAModule2|undefined
}

/** Station Data model */
class NetatmoNAMain implements INetatmoNAMain {
    id: string;
    type: string;
    last_status_store: number;
    module_name: string;
    wifi_status: string;
    wifi: string;
    reachable: boolean;
    station_name: string;
    data_type: Types[];
    place: IPlace;
    data: IData|undefined;
    available_modules: IAvailableModules;
    number_of_additional_modules: number
    modules: IModule;

    constructor(data: any, user: any) {
        // We need user information object to get conversion ratio
        const userInfo: INetatmoUserInformation = new NetatmoUserInformation(user);

        this.id = data._id;
        this.type = data.type;
        this.last_status_store = data.last_status_store;
        this.module_name = data.module_name;
        this.wifi_status = data.wifi_status;

        // Set Wifi status
        switch (true) {
            case (data.wifi_status >= 86):
                this.wifi = 'bad';
                break;
            case (data.wifi_status < 86 && data.wifi_status > 56):
                this.wifi = 'average';
                break;
            case (data.wifi_status <= 56):
                this.wifi = 'good';
                break;
            default:
                this.wifi = 'good';
                break;
        }

        this.reachable = data.reachable;
        this.station_name = data.station_name || 'Main station'; // Default name in case of no module name given
        this.data_type = data.data_type;
        this.place = {
            altitude: data.place.altitude,
            city: data.place.city,
            country: data.place.country,
            timezone: data.place.timezone,
            latitude: data.place.location[1],
            longitude: data.place.location[0],
        };

        // If main module reachable
        if (this.reachable) {
            this.data = {
                temperature: Math.round(eval(data.dashboard_data.Temperature + '*' + userInfo.temperature_ratio) * 10) / 10,
                co2: data.dashboard_data.CO2,
                humidity: data.dashboard_data.Humidity,
                noise: data.dashboard_data.Noise,
                pressure: Math.round(data.dashboard_data.Pressure * userInfo.pressure_ratio * 10) / 10,
                absolute_pressure: Math.round(data.dashboard_data.AbsolutePressure * userInfo.pressure_ratio * 10) / 10,
                min_temp: Math.round(eval(data.dashboard_data.min_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                max_temp: Math.round(eval(data.dashboard_data.max_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                temp_trend: data.dashboard_data.temp_trend,
                pressure_trend: data.dashboard_data.pressure_trend
            }
        } else {
            this.data = undefined;
        }

        // Set data for all installed modules
        this.available_modules = {
            OUTDOOR: false,
            INDOOR: false,
            INDOOR_SECOND: false,
            INDOOR_THIRD: false,
            RAIN: false,
            WIND: false
        };

        this.number_of_additional_modules = 0;

        this.modules = {
            OUTDOOR: undefined,
            INDOOR: undefined,
            INDOOR_SECOND: undefined,
            INDOOR_THIRD: undefined,
            RAIN: undefined,
            WIND: undefined,
        };

        // Handle modules
        let indoor_module_counter = 0;
        data.modules.map((module: any) => {
            switch (module.type) {
                case MODULE_TYPE.OUTDOOR:
                    this.modules['OUTDOOR'] = new NetatmoNAModule1(module, userInfo);
                    this.available_modules['OUTDOOR'] = true;
                    break;
                case MODULE_TYPE.INDOOR:
                    // A maximum of 3 indoor modules can be available
                    if (indoor_module_counter === 0) {
                        this.modules['INDOOR'] = new NetatmoNAModule4(module, userInfo);
                        this.available_modules['INDOOR'] = true;
                        this.number_of_additional_modules = this.number_of_additional_modules + 1;
                    } else if (indoor_module_counter === 1) {
                        this.modules['INDOOR_SECOND'] = new NetatmoNAModule4(module, userInfo);
                        this.available_modules['INDOOR_SECOND'] = true;
                        this.number_of_additional_modules = this.number_of_additional_modules + 1;
                    } else if (indoor_module_counter === 2) {
                        this.modules['INDOOR_THIRD'] = new NetatmoNAModule4(module, userInfo);
                        this.available_modules['INDOOR_THIRD'] = true;
                        this.number_of_additional_modules = this.number_of_additional_modules + 1;
                    }
                    indoor_module_counter++;
                    break;
                case MODULE_TYPE.RAIN:
                    this.modules['RAIN'] = new NetatmoNAModule3(module, userInfo);
                    this.available_modules['RAIN'] = true;
                    this.number_of_additional_modules = this.number_of_additional_modules + 1;
                    break;
                case MODULE_TYPE.WIND:
                    this.modules['WIND'] = new NetatmoNAModule2(module, userInfo);
                    this.available_modules['WIND'] = true;
                    this.number_of_additional_modules = this.number_of_additional_modules + 1;
                    break;
            }
        });

        console.debug(this)
    }
}

export default NetatmoNAMain
