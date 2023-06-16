export { }


interface AuthId {
    AuthId:string
}

declare global {
    namespace Express {
        export interface Request extends AuthId {}
    }
}
