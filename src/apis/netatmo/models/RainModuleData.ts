import {DashboardData, Module} from "../interfaces/ApiStationData";
import UserData from "./UserData";
import CommonModuleData from "./CommonModuleData";

class RainModuleData extends CommonModuleData {
    public rain!: number
    public sum_rain_24!: number
    public sum_rain_1!: number

    constructor(data: Module, userData: UserData) {
        super(data, userData);

        this.setDashboardData(data.dashboard_data);
        this.setBatteryLevel(data.battery_vp);

        console.debug(this)
    }

    private setDashboardData = (dashboard_data: DashboardData): void => {
        this.rain = Number((dashboard_data.Rain as number / this.userData.rain_ratio).toFixed(this.userData.unit === 'si' ? 1 : 3));
        this.sum_rain_24 = Number((dashboard_data.sum_rain_24 as number / this.userData.rain_ratio).toFixed(this.userData.unit === 'si' ? 1 : 3));
        this.sum_rain_1 = Number((dashboard_data.sum_rain_1 as number / this.userData.rain_ratio).toFixed(this.userData.unit === 'si' ? 1 : 3));
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

export default RainModuleData
