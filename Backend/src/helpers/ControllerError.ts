import { Error } from "../types/error-interfaces";

interface key {
    key: string;
}


const throwError = (
    errorMsg: string,
    statusCode : number
) => {
    const error: Error = new Error(errorMsg);
    error.statusCode = statusCode
    throw error;
}

export { throwError}
