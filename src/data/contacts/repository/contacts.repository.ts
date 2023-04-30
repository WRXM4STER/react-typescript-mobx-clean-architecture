import { Resource } from "core/common";
import { Contact } from "domain/contacts/model/contact.model";
import { ContactData } from "data/contacts/model/contact-data.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract deleteContact(id:number):Promise<Resource<boolean>> 
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}