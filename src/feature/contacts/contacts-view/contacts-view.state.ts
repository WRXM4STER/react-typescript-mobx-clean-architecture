import { Contact } from "data/contacts/model/contact.model";

export interface ContactsViewState {
    error:string,
    search:string,
    name:string,
    phone:string,
    contacts:Contact[]
}