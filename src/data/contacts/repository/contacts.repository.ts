import { Contact } from "data/contacts/repository/model/contact.model";
import { Resource } from "core/common/resource";
import { ContactData } from "data/contacts/repository/dto/contact-data.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract deleteContact(id:number):Promise<Resource<boolean>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}