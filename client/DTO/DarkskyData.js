/**
 * Darksky Data DTO
 */
class DarkskyData {
    constructor(data) {
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

        data.daily.data.map(day => {
            const dataDay = {
                time: day.time,
                summary: day.summary,
                icon: day.icon,
                sunrise_time: day.sunriseTime,
                sunset_time: day.sunsetTime,
                temperature_low: day.temperatureLow,
                temperature_high: day.temperatureHigh,
            };
            this.daily.data.push(dataDay);
        });

        console.debug(this)
    }
}

export default DarkskyData