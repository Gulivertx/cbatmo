import moment from 'moment';

/**
 * Netatmo Charts Data DTO
 */
class NetatmoModuleChartData {
    constructor(data, types) {
        this.data = [];

        Object.entries(data).map((obj, index) => {
            const formatedObject = {name: moment.unix(Number.parseInt(obj[0])).format('HH:mm')};

            types.map((label, index) => {
                formatedObject[label] = obj[1][index];
            });

            this.data.push(formatedObject)
        });

        console.log(this)
    }
}

export default NetatmoModuleChartData