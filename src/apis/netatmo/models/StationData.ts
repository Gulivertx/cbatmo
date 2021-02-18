import {AvailableModules, Device, Module} from "../interfaces/ApiStationData";
import {modules} from "../types";
import UserData from "./UserData";
import IndoorModuleData from "./IndoorModuleData";
import OutdoorModuleData from "./OutdoorModuleData";
import RainModuleData from "./RainModuleData";
import WindModuleData from "./WindModuleData";
import MainModuleData from "./MainModuleData";
import PlaceData from "./PlaceData";

class StationData {
    public readonly userData: UserData;

    public co2_calibrating: boolean
    public home_id: string
    public home_name: string
    public last_status_store: number
    public place: PlaceData

    public main_data!: MainModuleData
    public modules: (IndoorModuleData|OutdoorModuleData|RainModuleData|WindModuleData)[] = []

    public available_modules: AvailableModules = {
        outdoor: false,
        indoor1: false,
        indoor2: false,
        indoor3: false,
        rain: false,
        wind: false
    }

    constructor(data: Device, userData: UserData) {
        this.userData = userData;

        this.co2_calibrating = data.co2_calibrating;
        this.home_id = data.home_id;
        this.home_name = data.home_name;
        this.last_status_store = data.last_status_store;
        this.place = new PlaceData(data.place);

        this.main_data = new MainModuleData(data, this.userData);
        this.setModules(data.modules);

        console.debug(this);
    }

    private setModules = (externalModules: Module[]): void => {
        externalModules.map(module => {
            switch (module.type) {
                case modules.outdoor:
                    this.available_modules.outdoor = true;
                    this.modules.push(new OutdoorModuleData(module, this.userData));
                    break;
                case modules.rain:
                    this.available_modules.rain = true;
                    this.modules.push(new RainModuleData(module, this.userData));
                    break;
                case modules.wind:
                    this.available_modules.wind = true;
                    this.modules.push(new WindModuleData(module, this.userData));
                    break;
                case modules.indoor:
                    if (!this.available_modules.indoor1) {
                        this.available_modules.indoor1 = true;
                        this.modules.push(new IndoorModuleData(module, this.userData));
                    } else if (!this.available_modules.indoor2) {
                        this.available_modules.indoor2 = true;
                        this.modules.push(new IndoorModuleData(module, this.userData));
                    } else if (!this.available_modules.indoor3) {
                        this.available_modules.indoor3 = true;
                        this.modules.push(new IndoorModuleData(module, this.userData));
                    }
                    break;
            }
        });
    }
}

export default StationData
