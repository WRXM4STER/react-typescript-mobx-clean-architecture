import { Contact } from "app/domain/contacts";

export interface ContactsViewState {
    error:string,
    search:string,
    name:string,
    phone:string,
    contacts:Contact[]
}