declare module Netatmo {
    type wifi_level = '1'|'2'|'3'|'4';
    type radio_level = '1'|'2'|'3'|'4'|'5';
    type battery_level = 'very-low'|'low'|'medium'|'high'|'full'|'max';

    type chart_scale = '30min'|'1hour'|'3hours'|'1day'|'1week'|'1month';

    type timelapse = '12h'|'1d'|'1m';

    type data_type = 'Temperature'|'CO2'|'Humidity'|'Noise'|'Pressure';

    interface IApiAuthenticationResult {
        access_token: string
        refresh_token: string
        expire_in: number // timestamp
    }

    interface IApiRefreshTokenResult {
        access_token: string
        refresh_token: string
        expire_in: number // timestamp
    }
}
