import ServerCodes from "../constants/ServerCodes";
import { toaster } from "./toast.util";

export const errorHandler = (status: number, body: Record<string, any>) => {
    console.log(body);

    let message = body.message;

    if (Array.isArray(body.message)) {
        message = body.message[0];
    }

    toaster({ type: "error", message });

    const err = {
        message: message,
        error: body?.developer_message,
        status
    };

    if (status === ServerCodes.UNAUTHORIZED) {
    }

    throw err;
};

export const appendQueryParams = (url: string, paramsObj: Record<any, any>) => {
    let newUrl;
    const paramsArr: any = [];
    Object.keys(paramsObj).forEach((key) => {
        if (Array.isArray(paramsObj[key])) {
            paramsObj[key].forEach((paramsVal: string) => {
                paramsArr.push(`${key}[]=${paramsVal}`);
            });
        } else {
            paramsArr.push(`${key}=${paramsObj[key]}`);
        }
    });
    newUrl = `${url}?${paramsArr.join("&")}`;
    return newUrl;
};
