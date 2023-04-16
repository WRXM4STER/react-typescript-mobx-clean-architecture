import { ErrorMessages } from "../error-messages/error-messages"

export type Resource<T> = {
    success?:T,
    error?:string | ErrorMessages
}