import ServerCodes from "../constants/ServerCodes";
import { errorHandler } from "../utils/api.utils";
import Config from "../Config";

class API {
    private _apiRoute: string = "";
    private _token: string | null | undefined = null;
    private _queryParams: Record<string, any> = {};
    private _bodyData: Record<string, any> = {};
    private _method: ApiMethods = "GET";
    private _abortSignal: AbortSignal | null = null;

    constructor(url: string, method: ApiMethods = "GET", isAbsolute: boolean = false) {
        this._apiRoute = isAbsolute ? `${url}` : `${Config.API_URL}${url}`;
        if (method) {
            this._method = method;
        }
    }

    // noToast() {
    //     this._showToast = false;
    //     return this;
    // }

    private _sanitizeQueryParams(): string {
        const paramsArr: Array<any> = [];
        Object.keys(this._queryParams).forEach((key) => {
            if (Array.isArray(this._queryParams[key])) {
                this._queryParams[key].forEach((val: string) => {
                    paramsArr.push(`${key}[]=${val}`);
                });
            } else {
                paramsArr.push(`${key}=${this._queryParams[key]}`);
            }
        });

        return `${this._apiRoute}?${paramsArr.join("&")}`;
    }

    attachToken(token?: string): this {
        this._token = token || store.getState().auth.token;
        return this;
    }

    addAbortSignal(abortSignal: AbortSignal): this {
        this._abortSignal = abortSignal;
        return this;
    }

    addQueryParams(params: Record<string, any>): this {
        this._queryParams = {
            ...this._queryParams,
            ...params
        };
        return this;
    }

    addBodyData(data: Record<string, any>): this {
        this._bodyData = data;
        return this;
    }

    async send<T = void>(formData?: boolean): Promise<ResponseType<T>> {
        const route: string = Object.keys(this._queryParams).length
            ? `${this._sanitizeQueryParams()}`
            : this._apiRoute;

        const headers: Record<string, string> = {
            ...(!formData && { "Content-Type": "application/json" }),
            ...(formData && { "Content-Type": "multipart/form-data" })
        };

        if (this._token) {
            headers["Authorization"] = "Bearer " + this._token;
        }

        const response: ResponseType<T> = {
            status: 200,
            data: null
        };

        const api = await fetch(route, {
            method: this._method,
            headers,
            ...(!formData &&
                !!Object.keys(this._bodyData).length && {
                    body: JSON.stringify(this._bodyData)
                }),
            ...(formData && {
                body: this._bodyData
            })
        });

        response.status = api.status;

        const data = await api.json();
        if (
            api.status >= ServerCodes.BAD_REQUEST &&
            api.status < ServerCodes.CONNECTION_TIMED_OUT
        ) {
            response.error = errorHandler(response.status, data);
        } else {
            response.data = data;
        }

        return response;
    }
}

export default API;
