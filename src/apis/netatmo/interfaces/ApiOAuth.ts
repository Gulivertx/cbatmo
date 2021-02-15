/**
 * See https://dev.netatmo.com/apidocumentation/oauth for more info
 */
export interface ApiOAuthTokenQuery {
    readonly client_id: string
    readonly client_secret: string
    readonly grant_type: 'password'
    readonly username: string
    readonly password: string
    readonly scope?: string
}

export interface ApiRefreshTokenQuery {
    readonly client_id: string
    readonly client_secret: string
    readonly grant_type: 'refresh_token'
    readonly refresh_token: string
}

export interface ApiTokenResponse {
    readonly access_token: string
    readonly expires_in: number
    readonly refresh_token: string
}
