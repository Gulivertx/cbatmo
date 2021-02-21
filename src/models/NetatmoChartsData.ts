import moment from 'moment';
import UserData from "../apis/netatmo/models/UserData";

export interface INetatmoChartData {
    data: any[]
}

/** Netatmo Charts Data model */
class NetatmoModuleChartData implements INetatmoChartData {
    data = [];

    constructor(data: any, type: string[], userInfo: UserData) {
        this.data = [];

        Object.entries(data).map((obj: any) => {
            const formatedObject: any = {name: moment.unix(Number.parseInt(obj[0])).format('HH:mm')};

            type.map((label, index) => {
                // Convert value according to user units
                switch (label) {
                    case 'Temperature':
                        formatedObject[label] = Math.round(eval(obj[1][index] + '*' + userInfo.temperature_ratio) * 10) / 10;
                        break;
                    case 'Pressure':
                        formatedObject[label] = Math.round(obj[1][index] * userInfo.pressure_ratio);
                        break;
                    case 'Rain':
                        formatedObject[label] = Math.round(eval(obj[1][index] + '* 10 *' + userInfo.temperature_ratio) * 10) / 10;
                        break;
                    case 'windStrength':
                        formatedObject[label] = Math.round(obj[1][index] * userInfo.wind_ratio);
                        break;
                    default:
                        formatedObject[label] = obj[1][index];
                        break;
                }

            });

            // @ts-ignore
            this.data.push(formatedObject)
        });

        console.debug(this)
    }
}

export default NetatmoModuleChartData
