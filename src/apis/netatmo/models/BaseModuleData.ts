import {BaseModule} from "../interfaces/ApiStationData";
import UserData from "./UserData";
import {module, type} from "../types";

abstract class BaseModuleData {
    public readonly userData: UserData;

    public id: string;
    public data_type: type[];
    public firmware: number;
    public last_setup: number;
    public module_name: string;
    public reachable: boolean;
    public type: module;

    protected constructor(data: BaseModule, userData: UserData) {
        this.userData = userData;

        this.id = data._id;
        this.data_type = data.data_type;
        this.firmware = data.firmware;
        this.last_setup = data.last_setup;
        this.module_name = data.module_name;
        this.reachable = data.reachable;
        this.type = data.type;
    }
}

export default BaseModuleData
