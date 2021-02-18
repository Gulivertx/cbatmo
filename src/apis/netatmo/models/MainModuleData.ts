import {DashboardData, Device} from "../interfaces/ApiStationData";
import {trend, wifi_level} from "../types";
import UserData from "./UserData";
import BaseModuleData from "./BaseModuleData";

class MainModuleData extends BaseModuleData {
    public temperature!: number
    public co2!: number
    public humidity!: number
    public noise!: number
    public pressure!: number
    public absolute_pressure!: number
    public min_temp!: number
    public max_temp!: number
    public temp_trend!: trend
    public pressure_trend!: trend

    public wifi_level!: wifi_level

    constructor(data: Device, userData: UserData) {
        super(data, userData);

        this.setDashboardData(data.dashboard_data);
        this.setWifiLevel(data.wifi_status);

        console.debug(this)
    }

    private setDashboardData = (dashboard_data: DashboardData): void => {
        this.temperature = Math.round(eval(dashboard_data.Temperature + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.co2 = dashboard_data.CO2 as number;
        this.humidity = dashboard_data.Humidity as number;
        this.noise = dashboard_data.Noise as number;
        this.pressure = Math.round(dashboard_data.Pressure as number * this.userData.pressure_ratio * 10) / 10;
        this.absolute_pressure = Math.round(dashboard_data.AbsolutePressure as number * this.userData.pressure_ratio * 10) / 10;
        this.min_temp = Math.round(eval(dashboard_data.min_temp as number + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.max_temp = Math.round(eval(dashboard_data.max_temp as number + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.temp_trend = dashboard_data.temp_trend as trend;
        this.pressure_trend = dashboard_data.pressure_trend as trend;
    }

    private setWifiLevel = (wifi_status: number): void => {
        switch (true) {
            case (wifi_status >= 86):
                this.wifi_level = 'low';
                break;
            case (wifi_status < 86 && wifi_status >= 71):
                this.wifi_level = 'medium';
                break;
            case (wifi_status < 71 && wifi_status >= 56):
                this.wifi_level = 'high';
                break;
            default:
                this.wifi_level = 'full';
                break;
        }
    }
}

export default MainModuleData
