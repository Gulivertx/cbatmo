/**
 * NAModule3 : Rain
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
            this.date = {
                wind_strength: data.dashboard_data.WindStrength,
                wind_angle: data.dashboard_data.WindAngle,
                gust_strength: data.dashboard_data.GustStrength,
                gust_angle: data.dashboard_data.GustAngle,
                max_wind_str: data.dashboard_data.max_wind_str,
                max_wind_angle: data.dashboard_data.max_wind_angle
            }

        }
    }
}

export default NetatmoModuleRain