import {Place} from "../interfaces/ApiStationData";

class PlaceData {
    public readonly city: string
    public readonly country: string
    public readonly altitude: number
    public readonly timezone: string
    public readonly longitude: number
    public readonly latitude: number

    constructor(data: Place) {
        this.city = data.city;
        this.country = data.country;
        this.altitude = data.altitude;
        this.timezone = data.timezone;
        this.longitude = data.location[0];
        this.latitude = data.location[1];

        console.debug(this);
    }
}

export default PlaceData
