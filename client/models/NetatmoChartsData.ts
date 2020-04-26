import moment from 'moment';

export interface INetatmoChartData {
    data: any[]
}

export type Scale = '30min'|'1hour'|'3hours'|'1day'|'1week'|'1month';
export type Types = 'Temperature'|'CO2'|'Humidity'|'Noise'|'Pressure';

/** Netatmo Charts Data DTO */
class NetatmoModuleChartData implements INetatmoChartData{
    data = [];

    constructor(data: any, type: string[]) {
        this.data = [];

        Object.entries(data).map((obj: any) => {
            const formatedObject: any = {name: moment.unix(Number.parseInt(obj[0])).format('HH:mm')};

            type.map((label, index) => {
                formatedObject[label] = obj[1][index];
            });

            // @ts-ignore
            this.data.push(formatedObject)
        });

        console.debug(this)
    }
}

export default NetatmoModuleChartData
