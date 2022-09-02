import { Resource } from "../../../../../core/utils/resource";
import { ContactData } from "../../domain/dto/contact-data.model";
import { Contact } from "../../domain/models/contact.model";


export abstract class ContactsRepository {
   
    abstract createContact(name:string, phone:string):Promise<Resource<Contact>>
    abstract getContacts():Promise<Resource<Contact[]>>
    abstract deleteContact(id:number):Promise<Resource<boolean>>
    abstract updateContact(params:ContactData):Promise<Resource<boolean>>
    abstract searchContacts(search:string):Promise<Resource<Contact[]>>
    
}