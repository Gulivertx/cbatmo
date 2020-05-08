/** OpenWeather Data Model */
import {ICurrently, IDaily, IDailyData, IPlace} from "./WeatherInterface";

export interface IOpenWeatherData {
    last_status_store: number;
    place: IPlace;
    currently: ICurrently;
    daily: IDaily;
}

class OpenWeatherData implements IOpenWeatherData {
    last_status_store: number;
    place: IPlace;
    currently: ICurrently;
    daily: IDaily;

    constructor(data: any) {
        console.log(data)
        this.last_status_store = data.current.dt;
        this.place = {
            timezone: data.timezone,
            latitude: data.lat,
            longitude: data.lon,
        };
        this.currently = {
            time: data.current.dt,
            temperature: data.current.temp,
            humidity: data.current.humidity,
            pressure: data.current.pressure,
            wind_speed: data.current.wind_speed,
            wind_gust: data.current.wind_gust,
            uv_index: data.current.uvi,
            ozone: 0, // not exist in openweather
            icon: data.current.weather[0].icon,
            summary: data.current.weather[0].description,
        };

        this.daily = {
            summary: data.current.weather[0].description,
            icon: data.current.weather[0].icon,
            data: []
        };

        data.daily.map((day: any) => {
            const dataDay: IDailyData = {
                time: day.dt,
                summary: day.weather[0].description,
                icon: day.weather[0].icon,
                icon_id: day.weather[0].id,
                sunrise_time: day.sunrise,
                sunset_time: day.sunset,
                moon_phase: 0, // not exist in openweather
                temperature_low: day.temp.min,
                temperature_high: day.temp.max,
            };
            this.daily.data.push(dataDay)
        });

        console.debug(this)
    }
}

export default OpenWeatherData
