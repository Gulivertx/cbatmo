import {DashboardData, Device, Module} from "../interfaces/ApiStationData";
import {trend, wifi_level, modules} from "../types";
import UserData from "./UserData";
import BaseModuleData from "./BaseModuleData";

class MainModuleData extends BaseModuleData {
    public co2_calibrating: boolean
    public home_id: string
    public home_name: string
    public last_status_store: number
    public wifi_status!: wifi_level

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

    public available_modules = {
        outdoor: false,
        indoor1: false,
        indoor2: false,
        indoor3: false,
        rain: false,
        wind: false
    }

    constructor(data: Device, userData: UserData) {
        super(data, userData);

        this.co2_calibrating = data.co2_calibrating;
        this.home_id = data.home_id;
        this.home_name = data.home_name;
        this.last_status_store = data.last_status_store;

        this.setWifiStatus(data.wifi_status);
        this.setDashboardData(data.dashboard_data);
        this.setAvailableModules(data.modules);

        console.debug(this)
    }

    private setWifiStatus = (wifi_status: number): void => {
        switch (true) {
            case (wifi_status >= 86):
                this.wifi_status = 'low';
                break;
            case (wifi_status < 86 && wifi_status >= 71):
                this.wifi_status = 'medium';
                break;
            case (wifi_status < 71 && wifi_status >= 56):
                this.wifi_status = 'high';
                break;
            default:
                this.wifi_status = 'full';
                break;
        }
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

    private setAvailableModules = (externalModules: Module[]): void => {
        externalModules.map(module => {
            switch (module.type) {
                case modules.outdoor:
                    this.available_modules.outdoor = true;
                    break;
                case modules.rain:
                    this.available_modules.rain = true;
                    break;
                case modules.wind:
                    this.available_modules.wind = true;
                    break;
                case modules.indoor:
                    if (!this.available_modules.indoor1) {
                        this.available_modules.indoor1 = true;
                    } else if (!this.available_modules.indoor2) {
                        this.available_modules.indoor2 = true;
                    } else if (!this.available_modules.indoor3) {
                        this.available_modules.indoor3 = true;
                    }
                    break;
            }
        });
    }
}

export default MainModuleData
