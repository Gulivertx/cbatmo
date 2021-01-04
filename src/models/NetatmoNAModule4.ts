import {INetatmoUserInformation} from "./NetatmoUserInformation";
import {BatteryLevel, DataTypes, RadioLevel} from "../types/netatmo";

export interface INetatmoNAModule4 {
    id: string
    type: string
    module_name: string
    data_type: DataTypes[]
    reachable: boolean
    last_seen: number
    rf_status: number
    radio: RadioLevel
    battery_vp: number
    battery: BatteryLevel
    battery_percent: number
    data: IData|undefined
}

export interface IData {
    temperature: number
    co2: number
    humidity: number
    min_temp: number
    max_temp: number
    temp_trend: string
}

/** Indoor moduke model */
class NetatmoNAModule4 {
    id: string;
    type: string;
    module_name: string;
    data_type: DataTypes[];
    reachable: boolean;
    last_seen: number;
    rf_status: number;
    radio: RadioLevel;
    battery_vp: number;
    battery: BatteryLevel;
    battery_percent: number;
    data: IData|undefined;

    constructor(data: any, userInfo: INetatmoUserInformation) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name || 'Indoor'; // Default name in case of no module name given
        this.data_type = data.data_type;
        this.reachable = data.reachable;
        this.last_seen = data.last_seen;
        this.rf_status = data.rf_status;
        this.radio = data.radio;
        this.battery_vp = data.battery_vp;
        this.battery = data.battery;
        this.battery_percent = data.battery_percent;

        // Set radio status
        switch (true) {
            case (data.rf_status >= 90):
                this.radio = '1';
                break;
            case (data.rf_status < 90 && data.rf_status > 80):
                this.radio = '2';
                break;
            case (data.rf_status <= 80 && data.rf_status > 70):
                this.radio = '3';
                break;
            case (data.rf_status <= 70 && data.rf_status > 60):
                this.radio = '4';
                break;
            default:
                this.radio = '5';
                break;
        }

        this.battery_vp = data.battery_vp;

        // Set battery status
        switch (true) {
            case (data.battery_vp >= 6000):
                this.battery = 'max';
                break;
            case (data.battery_vp < 6000 && data.battery_vp >= 5640):
                this.battery = 'full';
                break;
            case (data.battery_vp < 5640 && data.battery_vp >= 5280):
                this.battery = 'high';
                break;
            case (data.battery_vp < 5280 && data.battery_vp >= 4920):
                this.battery = 'medium';
                break;
            case (data.battery_vp < 4920 && data.battery_vp >= 4560):
                this.battery = 'low';
                break;
            case (data.battery_vp < 4560):
                this.battery = 'very-low';
                break;
        }

        this.battery_percent = data.battery_percent;

        if (this.reachable) {
            this.data = {
                temperature: Math.round(eval(data.dashboard_data.Temperature + '*' + userInfo.temperature_ratio) * 10) / 10,
                co2: data.dashboard_data.CO2,
                humidity: data.dashboard_data.Humidity,
                min_temp: Math.round(eval(data.dashboard_data.min_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                max_temp: Math.round(eval(data.dashboard_data.max_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                temp_trend: data.dashboard_data.temp_trend
            }
        }
    }
}

export default NetatmoNAModule4
