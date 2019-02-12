/**
 * NAModule4 : Indoor
 */
class NetatmoModuleMain {
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
            this.temperature = data.dashboard_data.Temperature;
            this.co2 = data.dashboard_data.CO2;
            this.humidity = data.dashboard_data.Humidity;
            this.min_temp = data.dashboard_data.min_temp;
            this.max_temp = data.dashboard_data.max_temp;
            this.temp_trend = data.dashboard_data.temp_trend;
        }
    }
}

export default NetatmoModuleIndoor