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
            case (data.battery_vp < 6000 && data.battery_vp >= 5500):
                this.battery = 'full';
                break;
            case (data.battery_vp < 5500 && data.battery_vp >= 5000):
                this.battery = 'high';
                break;
            case (data.battery_vp < 5000 && data.battery_vp >= 4500):
                this.battery = 'medium';
                break;
            case (data.battery_vp < 4500 && data.battery_vp >= 4000):
                this.battery = 'low';
                break;
            case (data.battery_vp < 4000):
                this.battery = 'very-low';
                break;
        }

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