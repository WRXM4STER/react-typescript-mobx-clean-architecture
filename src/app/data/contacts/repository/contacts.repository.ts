import { Resource } from "app/core/common";
import { Contact } from "app/domain/contacts/model/contact.model";
import { ContactData } from "app/data/contacts/model/contact-data.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract deleteContact(id:number):Promise<Resource<boolean>> 
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}