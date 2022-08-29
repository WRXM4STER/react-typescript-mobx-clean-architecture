import { Resource } from "../../../../util/resource";
import { ContactData } from "../dto/contact-data.model";
import { Contact } from "../models/contact.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract deleteContact(id:number):Promise<Resource<boolean>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}