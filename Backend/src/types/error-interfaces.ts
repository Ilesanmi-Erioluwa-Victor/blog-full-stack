interface Key {
    key: string;
}

interface requestError {
    status?: number;
    message?: string;
    statusCode?: number;
}

interface Error {
  message?: string;
  statusCode?: number;
}

export type { requestError, Error}
