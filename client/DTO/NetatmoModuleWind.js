/**
 * Wind module DTO
 */
class NetatmoModuleWind {
    constructor(data) {
        this.id = data._id;
        this.type = data.type;
        this.module_name = data.module_name;
        this.data_type = data.data_type;
        this.reachable = data.reachable;
        this.last_seen = data.last_seen;
        this.rf_status = data.rf_status;

        // Set radio status
        switch (true) {
            case (data.rf_status <= 60):
                this.radio = 'high';
                break;
            case (data.rf_status <= 75 && data.rf_status > 60):
                this.radio = 'medium';
                break;
            case (data.rf_status < 90 && data.rf_status > 75):
                this.radio = 'low';
                break;
            case (data.rf_status >= 90):
                this.radio = 'very-low';
                break;
        }

        this.battery_vp = data.battery_vp;

        // Set battery status
        switch (true) {
            case (data.battery_vp >= 6000):
                this.battery = 'max';
                break;
            case (data.battery_vp < 6000 && data.battery_vp >= 5590):
                this.battery = 'full';
                break;
            case (data.battery_vp < 5590 && data.battery_vp >= 5180):
                this.battery = 'high';
                break;
            case (data.battery_vp < 5180 && data.battery_vp >= 4770):
                this.battery = 'medium';
                break;
            case (data.battery_vp < 4770 && data.battery_vp >= 4360):
                this.battery = 'low';
                break;
            case (data.battery_vp < 4360):
                this.battery = 'very-low';
                break;
        }

        this.battery_percent = data.battery_percent;

        if (this.reachable) {
            this.data = {
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

export default NetatmoModuleWind