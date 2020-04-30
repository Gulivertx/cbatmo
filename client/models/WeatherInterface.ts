export interface IPlace {
    timezone: string
    latitude: number
    longitude: number
}

export interface ICurrently {
    time: number
    temperature: number
    humidity: number
    pressure: number
    wind_speed: number
    wind_gust: number
    uv_index: number
    ozone: number
    icon: string
    summary: string
}

export interface IDaily {
    summary: string
    icon: string
    data: IDailyData[]
}

export interface IDailyData {
    time: number
    summary: string
    icon: string
    sunrise_time: number
    sunset_time: number
    moon_phase: number
    temperature_low: number
    temperature_high: number
}
