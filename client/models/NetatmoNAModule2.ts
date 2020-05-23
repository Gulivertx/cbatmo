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
    radio: string
    battery_vp: number
    battery: string
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
    radio: string;
    battery_vp: number;
    battery: string;
    battery_percent: number;
    data: IData|undefined;

    constructor(data: any, userInfo: INetatmoUserInformation) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name;
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
            case (data.battery_vp < 6000 && data.battery_vp >= 5590):
                this.battery = 'full';
                break;
            case (data.battery_vp < 5590 && data.battery_vp >= 5180):
                this.battery = 'high';
                break;
            case (data.battery_vp < 5180 && data.battery_vp >= 4770):
                this.battery = 'medium';
                break;
            case (data.battery_vp < 4770 && data.battery_vp >= 4360):
                this.battery = 'low';
                break;
            case (data.battery_vp < 4360):
                this.battery = 'very-low';
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
