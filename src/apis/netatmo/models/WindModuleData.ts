import {DashboardData, Module} from "../interfaces/ApiStationData";
import UserData from "./UserData";
import CommonModuleData from "./CommonModuleData";

class WindModuleData extends CommonModuleData {
    public wind_strength!: number
    public wind_angle!: number
    public gust_strength!: number
    public gust_angle!: number
    public max_wind_str!: number
    public max_wind_angle!: number

    constructor(data: Module, userData: UserData) {
        super(data, userData);

        this.setDashboardData(data.dashboard_data);
        this.setBatteryLevel(data.battery_vp);

        console.debug(this)
    }

    private setDashboardData = (dashboard_data: DashboardData): void => {
        this.wind_strength = Math.round(dashboard_data.WindStrength as number * this.userData.wind_ratio);
        this.wind_angle = dashboard_data.WindAngle as number;
        this.gust_strength = Math.round(dashboard_data.GustStrength as number * this.userData.wind_ratio);
        this.gust_angle = dashboard_data.GustAngle as number;
        this.max_wind_str = Math.round(dashboard_data.max_wind_str as number * this.userData.wind_ratio);
        this.max_wind_angle = dashboard_data.GustAngle as number;
    }

    private setBatteryLevel = (battery_vp: number): void => {
        switch (true) {
            case (battery_vp >= 6000):
                this.battery_level = 'max';
                break;
            case (battery_vp < 6000 && battery_vp >= 5590):
                this.battery_level = 'full';
                break;
            case (battery_vp < 5590 && battery_vp >= 5180):
                this.battery_level = 'high';
                break;
            case (battery_vp < 5180 && battery_vp >= 4770):
                this.battery_level = 'medium';
                break;
            case (battery_vp < 4770 && battery_vp >= 4360):
                this.battery_level = 'low';
                break;
            case (battery_vp < 4360):
                this.battery_level = 'very-low';
                break;
        }
    }
}

export default WindModuleData
