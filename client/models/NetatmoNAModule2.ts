import {INetatmoUserInformation} from "./NetatmoUserInformation";
import {Types} from "./NetatmoChartsData";

export interface INetatmoNAModule2 {
    id: string
    type: string
    module_name: string
    data_type: Types[]
    reachable: boolean
    last_seen: number
    rf_status: number
    radio: '1'|'2'|'3'|'4'
    battery_vp: number
    battery: '10'|'30'|'50'|'70'|'90'|'charging'
    battery_percent: number
    data: IData|undefined
}

export interface IData {
    wind_strength: number
    wind_angle: number
    gust_strength: number
    gust_angle: number
    max_wind_str: number
    max_wind_angle: number
}

/** Wind module model */
class NetatmoNAModule2 implements INetatmoNAModule2 {
    id: string;
    type: string;
    module_name: string;
    data_type: Types[];
    reachable: boolean;
    last_seen: number;
    rf_status: number;
    radio: '1'|'2'|'3'|'4';
    battery_vp: number;
    battery: '10'|'30'|'50'|'70'|'90'|'charging';
    battery_percent: number;
    data: IData|undefined;

    constructor(data: any, userInfo: INetatmoUserInformation) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name || 'Wind'; // Default name in case of no module name given
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
                this.radio = '4';
                break;
            case (data.rf_status <= 75 && data.rf_status > 60):
                this.radio = '3';
                break;
            case (data.rf_status < 90 && data.rf_status > 75):
                this.radio = '2';
                break;
            case (data.rf_status >= 90):
                this.radio = '1';
                break;
        }

        this.battery_vp = data.battery_vp;

        // Set battery status
        switch (true) {
            case (data.battery_vp >= 6000):
                this.battery = 'charging';
                break;
            case (data.battery_vp < 6000 && data.battery_vp >= 5590):
                this.battery = '90';
                break;
            case (data.battery_vp < 5590 && data.battery_vp >= 5180):
                this.battery = '70';
                break;
            case (data.battery_vp < 5180 && data.battery_vp >= 4770):
                this.battery = '50';
                break;
            case (data.battery_vp < 4770 && data.battery_vp >= 4360):
                this.battery = '30';
                break;
            case (data.battery_vp < 4360):
                this.battery = '10';
                break;
        }

        this.battery_percent = data.battery_percent;

        if (this.reachable) {
            this.data = {
                wind_strength: Math.round(data.dashboard_data.WindStrength * userInfo.wind_ratio),
                wind_angle: data.dashboard_data.WindAngle,
                gust_strength: Math.round(data.dashboard_data.GustStrength * userInfo.wind_ratio),
                gust_angle: data.dashboard_data.GustAngle,
                max_wind_str: Math.round(data.dashboard_data.max_wind_str * userInfo.wind_ratio),
                max_wind_angle: data.dashboard_data.max_wind_angle
            }
        }
    }
}

export default NetatmoNAModule2
