import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import moment from "moment";
import {ApiTokenResponse} from "./interfaces/ApiOAuth";
import {ApiStationDataResponse} from "./interfaces/ApiStationData";
import UserData from "./models/UserData";
import MainModuleData from "./models/MainModuleData";

const API_OAUTH_TOKEN: string = '/netatmo-auth';
const API_REFRESH_TOKEN: string = '/netatmo-refresh-token';
const API_FETCH_STATION_DATA: string = '/netatmo-station-data';

// This is the delay before next API call to refresh data
// Netatmo only refresh their API every 10 minutes so call less than 10 is not necessary
const API_REFRESH_DELAY: number = 10;

class NetatmoClient {
    private readonly httpClient: AxiosInstance;

    private access_token!: string;
    private refresh_token!: string;
    private expires_at!: number;

    private station_data!: ApiStationDataResponse;

    public constructor() {
        this.httpClient = axios.create();

        const refresh_token = window.localStorage.getItem('NetatmoRefreshToken');
        if (null !== refresh_token) {
            this.refresh_token = refresh_token;
        }
    }

    public auth = async (username: string, password: string, secret: string): Promise<void> => {
        try {
            const response = await this.httpClient.post<ApiTokenResponse>(
                API_OAUTH_TOKEN,
                {
                    'username': username,
                    'password': password,
                    'secret': secret
                }
            );

            this.saveApiTokenResponse(response.data);
        } catch (error) {
            throw this.handleFetchError(error);
        }
    }

    public refreshToken = async (): Promise<void> => {
        // Only refresh the access token if the valid time is expired or less than 10 minutes
        if (!this.access_token || moment.unix(this.expires_at).diff(moment(), 'minute') < 10) {
            try {
                const response = await this.httpClient.post<ApiTokenResponse>(
                    API_REFRESH_TOKEN,
                    {
                        'refresh_token': this.refresh_token
                    }
                );

                this.saveApiTokenResponse(response.data);
            } catch (error) {
                throw this.handleFetchError(error);
            }
        } else {
            console.debug('Access token is still valid.')
        }
    }

    public fetchStationData = async (): Promise<void> => {
        // Only fetch new station data if the last data fetched was did more than 10 minutes
        if (this.station_data === undefined || moment().diff(moment.unix(Number(this.station_data.time_server)), 'minute') > API_REFRESH_DELAY) {
            await this.refreshToken();

            try {
                const response = await this.httpClient.post<ApiStationDataResponse>(
                    API_FETCH_STATION_DATA,
                    {
                        'access_token': this.access_token
                    }
                );

                this.station_data = response.data;
            } catch (error) {
                throw this.handleFetchError(error);
            }
        } else {
            console.debug('Station data is up to date.')
        }
    }

    private addHttpClientToken = (access_token: string) => {
        this.httpClient.interceptors.request.use((req: AxiosRequestConfig) => {
            req.headers['Authorization'] = `Bearer ${access_token}`;
            return req;
        });
    }

    private saveApiTokenResponse = (data: ApiTokenResponse): void => {
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.expires_at = moment().unix() + data.expires_in;

        this.addHttpClientToken(data.access_token);

        window.localStorage.setItem('NetatmoRefreshToken', data.refresh_token);
        console.log(this.access_token, this.refresh_token, moment.unix(this.expires_at).format('DD.MM.YYYY'))
    }

    private handleFetchError = (error: any): any => {
        // Todo need to handle error
        let errorResponse: any;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response error');
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            errorResponse = error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('Request error', error.request);
            errorResponse = error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            errorResponse = error.message;
        }

        return errorResponse;
    }

    public getUserInformation = (): UserData => {
        return new UserData(this.station_data.body.user);
    }

    public getMainModuleData = (deviceIndex: number, userData: UserData): MainModuleData => {
        return new MainModuleData(this.station_data.body.devices[deviceIndex], userData);
    }
}

export default NetatmoClient
