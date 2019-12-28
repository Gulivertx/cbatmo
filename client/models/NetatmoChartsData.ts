import moment from 'moment';

export interface INetatmoChartData {
    data: any[]
}

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

        console.log(this)
    }
}

export default NetatmoModuleChartData
