/**
 * Rain module DTO
 */
class NetatmoModuleRain {
    constructor(data) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name;
        this.data_type = data.data_type;
        this.reachable = data.reachable;
        this.last_seen = data.last_seen;
        this.rf_status = data.rf_status;
        this.battery_vp = data.battery_vp;
        this.battery_percent = data.battery_percent;

        if (this.reachable) {
            this.data = {
                rain: data.dashboard_data.Rain,
                sum_rain_24: data.dashboard_data.sum_rain_24, // Last 24 hours
                sum_rain_1: data.dashboard_data.sum_rain_1 // Last hour
            }

        }
    }
}

export default NetatmoModuleRain