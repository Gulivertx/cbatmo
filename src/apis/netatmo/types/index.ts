/**
 * MODULES BINDING
 * NAMain = Station
 * NAModule1 = Outdoor module
 * NAModule2 = Wind module
 * NAModule3 = Rain module
 * NAModule4 = Indoor module
 */
export enum modules {
    station = 'NAMain',
    outdoor = 'NAModule1',
    wind = 'NAModule2',
    rain = 'NAModule3',
    indoor = 'NAModule4',
}
export type module = modules.station|modules.outdoor|modules.wind|modules.rain|modules.indoor

/**
 * DATA TYPES
 */
export enum types {
    temperature = 'Temperature',
    co2 = 'CO2',
    humidity = 'Humidity',
    noise = 'Noise',
    pressure = 'Pressure',
    rain = 'Rain',
    wind = 'Wind'
}
export type type = types.temperature|types.co2|types.humidity|types.noise|types.pressure|types.rain|types.wind

export type trend = 'stable'|'down'|'up'

/**
 * UNIT
 * 0 = metric system
 * 1 = imperial system"
 */
export enum units {
    metric,
    imperial
}
export type unit = units.metric|units.imperial

/**
 * WIND UNIT
 * 0 = kph
 * 1 = mph
 * 2 = ms
 * 3 = beaufort
 * 4 = knot
 */
export enum wind_units {
    kph,
    mph,
    ms,
    beaufort,
    knot
}
export type wind_unit = wind_units.kph|wind_units.mph|wind_units.ms|wind_units.beaufort|wind_units.knot

/**
 * PRESSURE UNIT
 * 0 = mbar
 * 1 = inHg
 * 2 = mmHg
 */
export enum pressure_units {
    mbar,
    inHg,
    mmHg
}
export type pressure_unit = pressure_units.mbar|pressure_units.inHg|pressure_units.mmHg

export type measure_timelapse = '30min'|'1hour'|'3hours'|'1day'|'1week'|'1month'

/**
 * DATA MEASURE TYPES
 * Timelapse between two measurements. Timelapse between two measurements.
 * temperature(°C), co2(ppm), humidity(%), pressure(mbar), noise(db), rain(mm), windStrength(km/h), windAngle(angles), guststrength(km/h), gustAngle(angles).
 * 30min-1-3hours = min_temp, max_temp, min_hum, max_hum, min_pressure, max_pressure, min_noise, max_noise,sum_rain.
 * 1day-1week-1month = date_max_gust, date_max_hum, min_pressure, date_min_pressure, date_max_pressure, min_noise, date_min_noise, max_noise, date_max_noise, date_min_co2, date_max_co2
 */
export enum measure_types {
    temperature = 'temperature',
    co2 = 'co2',
    humidity = 'humidity',
    noise = 'noise',
    pressure = 'pressure',
    rain = 'rain',
    wind_strength = 'windStrength',
    wind_angle = 'windAngle',
    gust_strength = 'guststrength',
    gust_angle = 'gustAngle',
    min_temp = 'min_temp',
    max_temp = 'max_temp',
    min_hum = 'min_hum',
    max_hum = 'max_hum',
    min_pressure = 'min_pressure',
    max_pressure = 'max_pressure',
    min_noise = 'min_noise',
    max_noise = 'max_noise',
    sum_rain = 'sum_rain',
    date_max_gust = 'date_max_gust',
    date_max_hum = 'date_max_hum',
    date_min_pressure = 'date_min_pressure',
    date_max_pressure = 'date_max_pressure',
    date_min_noise = 'date_min_noise',
    date_max_noise = 'date_max_noise',
    date_min_co2 = 'date_min_co2',
    date_max_co2 = 'date_max_co2'
}
export type measure_type = measure_types.temperature|measure_types.co2|measure_types.humidity|measure_types.noise|measure_types.pressure|measure_types.rain|
    measure_types.wind_strength|measure_types.wind_angle|measure_types.gust_strength|measure_types.gust_angle|measure_types.min_temp|measure_types.max_temp|
    measure_types.min_hum|measure_types.max_hum|measure_types.min_pressure|measure_types.max_pressure|measure_types.min_noise|measure_types.max_noise|
    measure_types.sum_rain|measure_types.date_max_gust|measure_types.date_max_hum|measure_types.date_min_pressure|measure_types.date_max_pressure|measure_types.date_min_noise|
    measure_types.date_max_noise|measure_types.date_min_co2|measure_types.date_max_co2

export type wifi_level = 'low'|'medium'|'high'|'full';
export type radio_level = 'low'|'medium'|'high'|'full'|'max';
export type battery_level = 'very-low'|'low'|'medium'|'high'|'full'|'max';
