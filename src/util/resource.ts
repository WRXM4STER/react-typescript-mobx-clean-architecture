import { ErrorMessages } from "./error-messages"

export type Resource<T> = {
    success?:T,
    error?:string | ErrorMessages
}