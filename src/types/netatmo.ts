export enum MODULE_TYPE {
    MAIN = 'NAMain',
    INDOOR = 'NAModule4',
    INDOOR_SECOND = 'NAModule4',
    INDOOR_THIRD = 'NAModule4',
    OUTDOOR = 'NAModule1',
    RAIN = 'NAModule3',
    WIND = 'NAModule2'
}

export type WifiLevel = '1'|'2'|'3'|'4';
export type RadioLevel = '1'|'2'|'3'|'4'|'5';
export type BatteryLevel = 'very-low'|'low'|'medium'|'high'|'full'|'max';

export type ChartScales = '30min'|'1hour'|'3hours'|'1day'|'1week'|'1month';

export type Timelapse = '12h'|'1d'|'1m';

export type DataTypes = 'Temperature'|'CO2'|'Humidity'|'Noise'|'Pressure';
