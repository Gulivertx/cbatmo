import {INetatmoUserInformation} from "./NetatmoUserInformation";
import {Types} from "./NetatmoChartsData";

export interface INetatmoNAModule1 {
    id: string
    type: string
    module_name: string
    data_type: Types[]
    reachable: boolean
    last_seen: number
    rf_status: number
    radio: string
    battery_vp: number
    battery: string
    battery_percent: number
    data: IData|undefined
}

export interface IData {
    temperature: number
    humidity: number
    min_temp: number
    max_temp: number
    temp_trend: string
}

/** Outdoor module model */
class NetatmoNAModule1 implements INetatmoNAModule1{
    id: string;
    type: string;
    module_name: string;
    data_type: Types[];
    reachable: boolean;
    last_seen: number;
    rf_status: number;
    radio: string;
    battery_vp: number;
    battery: string;
    battery_percent: number;
    data: IData|undefined;

    constructor(data: any, userInfo: INetatmoUserInformation) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name || 'Outdoor'; // Default name in case of no module name given
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
            case (data.rf_status <= 60):
                this.radio = 'high';
                break;
            case (data.rf_status <= 75 && data.rf_status > 60):
                this.radio = 'medium';
                break;
            case (data.rf_status < 90 && data.rf_status > 75):
                this.radio = 'low';
                break;
            case (data.rf_status >= 90):
                this.radio = 'very-low';
                break;
        }

        this.battery_vp = data.battery_vp;

        // Set battery status
        switch (true) {
            case (data.battery_vp >= 6000):
                this.battery = 'max';
                break;
            case (data.battery_vp < 6000 && data.battery_vp >= 5500):
                this.battery = 'full';
                break;
            case (data.battery_vp < 5500 && data.battery_vp >= 5000):
                this.battery = 'high';
                break;
            case (data.battery_vp < 5000 && data.battery_vp >= 4500):
                this.battery = 'medium';
                break;
            case (data.battery_vp < 4500 && data.battery_vp >= 4000):
                this.battery = 'low';
                break;
            case (data.battery_vp < 4000):
                this.battery = 'very-low';
                break;
        }

        this.battery_percent = data.battery_percent;

        if (this.reachable) {
            this.data = {
                temperature: Math.round(eval(data.dashboard_data.Temperature + '*' + userInfo.temperature_ratio) * 10) / 10,
                humidity: data.dashboard_data.Humidity,
                min_temp: Math.round(eval(data.dashboard_data.min_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                max_temp: Math.round(eval(data.dashboard_data.max_temp + '*' + userInfo.temperature_ratio) * 10) / 10,
                temp_trend: data.dashboard_data.temp_trend
            }
        }
    }
}

export default NetatmoNAModule1
