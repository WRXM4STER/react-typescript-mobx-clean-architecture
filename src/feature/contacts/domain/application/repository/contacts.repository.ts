import { Contact } from "../../../data/repository/models/contact.model";
import { Resource } from "../../../../../core/application/utils/resource";
import { ContactData } from "../../../data/repository/dto/contact-data.model";

export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract deleteContact(id:number):Promise<Resource<boolean>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}