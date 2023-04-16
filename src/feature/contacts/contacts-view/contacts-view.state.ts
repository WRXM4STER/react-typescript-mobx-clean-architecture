import { Contact } from "data";

export interface ContactsViewState {
    error:string,
    search:string,
    name:string,
    phone:string,
    contacts:Contact[]
}