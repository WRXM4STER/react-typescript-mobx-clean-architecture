import { ContactData } from "../../data/repository/models/contact-data.model";
import { Contact } from "../models/contact.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Contact>
    abstract getContacts():Promise<Contact[]>
    abstract deleteContact(id:number):Promise<boolean>
    abstract updateContact(params:ContactData):Promise<boolean>
    abstract searchContacts(search:string):Promise<Contact[]>
    
}