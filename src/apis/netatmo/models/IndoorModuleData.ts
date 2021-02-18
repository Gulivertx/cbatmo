import {DashboardData, Module} from "../interfaces/ApiStationData";
import {trend} from "../types";
import UserData from "./UserData";
import CommonModuleData from "./CommonModuleData";

class IndoorModuleData extends CommonModuleData {
    public temperature!: number
    public co2!: number
    public humidity!: number
    public min_temp!: number
    public max_temp!: number
    public temp_trend!: trend

    constructor(data: Module, userData: UserData) {
        super(data, userData);

        this.battery_percent = data.battery_percent;
        this.battery_vp = data.battery_vp;
        this.last_seen = data.last_seen;
        this.rf_status = data.rf_status;

        this.setDashboardData(data.dashboard_data);
        this.setBatteryLevel(data.battery_vp);

        console.debug(this)
    }

    private setDashboardData = (dashboard_data: DashboardData): void => {
        this.temperature = Math.round(eval(dashboard_data.Temperature + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.co2 = dashboard_data.CO2 as number;
        this.humidity = dashboard_data.Humidity as number;
        this.min_temp = Math.round(eval(dashboard_data.min_temp as number + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.max_temp = Math.round(eval(dashboard_data.max_temp as number + '*' + this.userData.temperature_ratio) * 10) / 10;
        this.temp_trend = dashboard_data.temp_trend as trend;
    }

    private setBatteryLevel = (battery_vp: number): void => {
        switch (true) {
            case (battery_vp >= 6000):
                this.battery_level = 'max';
                break;
            case (battery_vp < 6000 && battery_vp >= 5640):
                this.battery_level = 'full';
                break;
            case (battery_vp < 5640 && battery_vp >= 5280):
                this.battery_level = 'high';
                break;
            case (battery_vp < 5280 && battery_vp >= 4920):
                this.battery_level = 'medium';
                break;
            case (battery_vp < 4920 && battery_vp >= 4560):
                this.battery_level = 'low';
                break;
            case (battery_vp < 4560):
                this.battery_level = 'very-low';
                break;
        }
    }
}

export default IndoorModuleData
