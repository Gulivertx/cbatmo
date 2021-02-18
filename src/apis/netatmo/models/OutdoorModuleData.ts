import {DashboardData, Module} from "../interfaces/ApiStationData";
import {trend} from "../types";
import UserData from "./UserData";
import CommonModuleData from "./CommonModuleData";

class OutdoorModuleData extends CommonModuleData {
    public temperature!: number
    public humidity!: number
    public min_temp!: number
    public max_temp!: number
    public temp_trend!: trend

    constructor(data: Module, userData: UserData) {
        super(data, userData);

        this.setDashboardData(data.dashboard_data);
        this.setBatteryLevel(data.battery_vp);

        console.debug(this)
    }

    private setDashboardData = (dashboard_data: DashboardData): void => {
        this.temperature = Math.round(eval(dashboard_data.Temperature + '*' + this.userData.temperature_ratio) * 10) / 10;
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
            case (battery_vp < 6000 && battery_vp >= 5500):
                this.battery_level = 'full';
                break;
            case (battery_vp < 5500 && battery_vp >= 5000):
                this.battery_level = 'high';
                break;
            case (battery_vp < 5000 && battery_vp >= 4500):
                this.battery_level = 'medium';
                break;
            case (battery_vp < 4500 && battery_vp >= 4000):
                this.battery_level = 'low';
                break;
            case (battery_vp < 4000):
                this.battery_level = 'very-low';
                break;
        }
    }
}

export default OutdoorModuleData
