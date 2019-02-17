/**
 * Outdoor module DTO
 */
class NetatmoModuleOutdoor {
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
                temperature: data.dashboard_data.Temperature,
                humidity: data.dashboard_data.Humidity,
                min_temp: data.dashboard_data.min_temp,
                max_temp: data.dashboard_data.max_temp,
                temp_trend: data.dashboard_data.temp_trend
            }

        }
    }
}

export default NetatmoModuleOutdoor