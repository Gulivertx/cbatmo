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

export type type = 'Temperature'|'CO2'|'Humidity'|'Noise'|'Pressure'|'Rain'|'Wind'

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
