import NetatmoModuleOutdoor from './NetatmoModuleOutdoor';
import NetatmoModuleIndoor from './NetatmoModuleIndoor';
import NetatmoModuleRain from './NetatmoModuleRain';
import NetatmoModuleWind from './NetatmoModuleWind';

const MODULE_TYPE = {
    MAIN: 'NAMain',
    INDOOR: 'NAModule4',
    OUTDOOR: 'NAModule1',
    RAIN: 'NAModule3',
    WIND: 'NAModule2'
};

class NetatmoStationData {
    constructor(data) {
        this.id = data._id;
        this.type = data.type;
        this.last_status_store = data.last_status_store;
        this.module_name = data.module_name;
        this.wifi_status = data.wifi_status;
        this.reachable = data.reachable;
        this.station_name = data.station_name;
        this.data_type = data.data_type;
        this.place = {
            altitude: data.place.altitude,
            city: data.place.city,
            country: data.place.country,
            timezone: data.place.timezone,
            latitude: data.place.location[1],
            longitude: data.place.location[0],
        };

        // If main module reachable
        if (this.reachable) {
            this.data = {
                temperature: data.dashboard_data.Temperature,
                co2: data.dashboard_data.CO2,
                humidity: data.dashboard_data.Humidity,
                noise: data.dashboard_data.Noise,
                pressure: data.dashboard_data.Pressure,
                absolute_pressure: data.dashboard_data.AbsolutePressure,
                min_temp: data.dashboard_data.min_temp,
                max_temp: data.dashboard_data.max_temp,
                temp_trend: data.dashboard_data.temp_trend,
                pressure_trend: data.dashboard_data.pressure_trend
            }
        }

        this.available_modules = {
            'OUTDOOR': false,
            'INDOOR': false,
            'RAIN': false,
            'WIND': false
        };
        this.modules = [];

        // Handle modules
        data.modules.map(module => {
            switch (module.type) {
                case MODULE_TYPE.OUTDOOR:
                    this.modules['OUTDOOR'] = new NetatmoModuleOutdoor(module);
                    this.available_modules['OUTDOOR'] = true;
                    break;
                case MODULE_TYPE.INDOOR:
                    this.modules['INDOOR'] = new NetatmoModuleIndoor(module);
                    this.available_modules['INDOOR'] = true;
                    break;
                case MODULE_TYPE.RAIN:
                    this.modules['RAIN'] = new NetatmoModuleRain(module);
                    this.available_modules['RAIN'] = true;
                    break;
                case MODULE_TYPE.WIND:
                    this.modules['WIND'] = new NetatmoModuleWind(module);
                    this.available_modules['WIND'] = true;
                    break;
            }
        });

        console.log(this)
    }
}

export default NetatmoStationData