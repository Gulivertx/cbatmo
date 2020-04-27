/** Darksky Data Mode */
import {ICurrently, IDaily, IDailyData, IPlace} from "./WeatherInterface";

export interface IDarkskyData {
    last_status_store: number;
    place: IPlace;
    currently: ICurrently;
    daily: IDaily;
}

class DarkskyData implements IDarkskyData {
    last_status_store: number;
    place: IPlace;
    currently: ICurrently;
    daily: IDaily;

    constructor(data: any) {
        this.last_status_store = data.currently.time;
        this.place = {
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
        };
        this.currently = {
            time: data.currently.time,
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            pressure: data.currently.pressure,
            wind_speed: data.currently.windSpeed,
            wind_gust: data.currently.windGust,
            uv_index: data.currently.uvIndex,
            ozone: data.currently.ozone,
            icon: data.currently.icon,
            summary: data.currently.summary,
        };

        this.daily = {
            summary: data.daily.summary,
            icon: data.daily.icon,
            data: []
        };

        data.daily.data.map((day: any) => {
            const dataDay: IDailyData = {
                time: day.time,
                summary: day.summary,
                icon: day.icon,
                sunrise_time: day.sunriseTime,
                sunset_time: day.sunsetTime,
                moon_phase: day.moonPhase,
                temperature_low: day.temperatureLow,
                temperature_high: day.temperatureHigh,
            };
            this.daily.data.push(dataDay)
        });

        console.debug(this)
    }
}

export default DarkskyData
