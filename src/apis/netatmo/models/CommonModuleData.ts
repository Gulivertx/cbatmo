import {battery_level, radio_level} from "../types";
import {Module} from "../interfaces/ApiStationData";
import BaseModuleData from "./BaseModuleData";
import UserData from "./UserData";

abstract class CommonModuleData extends BaseModuleData{
    public battery_percent: number
    public battery_vp: number
    public last_seen: number
    public rf_status: number
    public radio_level!: radio_level
    public battery_level!: battery_level


    protected constructor(data: Module, userData: UserData) {
        super(data, userData);
        this.battery_percent = data.battery_percent;
        this.battery_vp = data.battery_vp;
        this.last_seen = data.last_seen;
        this.rf_status = data.rf_status;

        this.setRadioLevel(data.rf_status);
    }

    private setRadioLevel = (rf_status: number) => {
        switch (true) {
            case (rf_status >= 90):
                this.radio_level = 'low';
                break;
            case (rf_status < 90 && rf_status > 80):
                this.radio_level = 'medium';
                break;
            case (rf_status <= 80 && rf_status > 70):
                this.radio_level = 'high';
                break;
            case (rf_status <= 70 && rf_status > 60):
                this.radio_level = 'full';
                break;
            default:
                this.radio_level = 'max';
                break;
        }
    }
}

export default CommonModuleData
