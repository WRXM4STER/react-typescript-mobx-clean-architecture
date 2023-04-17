import { Contact } from "data/contacts";

export interface ContactsViewState {
    error:string,
    search:string,
    name:string,
    phone:string,
    contacts:Contact[]
}