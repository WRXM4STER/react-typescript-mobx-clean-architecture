import { ErrorMessages, Resource } from "app/core/common";
import { baseClient } from "app/shared/api";
import { ContactData } from "../model/contact-data.model";
import { ContactsRepository } from "./contacts.repository";
import { Contact } from "../../../domain/contacts/model/contact.model";
import { mapToDomain } from "../mapper";

export class ContactsRepositoryImpl extends ContactsRepository {

    async createContact(name: string, phone: string): Promise<Resource<Contact>> {
        const response = await baseClient.post<ContactData>('/contacts', {
            name,
            phone
        });
        const contact = response.data;
        if (response.status!==200 && !contact) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            })
        }
        return Promise.resolve({
            success:{
                id:contact.id,
                name:contact.name,
                phone:contact.phone,
                is_edit:false
            }
        }) 
    }

    async getContacts(): Promise<Resource<Contact[]>> {
        const response = await baseClient.get<ContactData[]>('/contacts');
        const contacts = response.data;
        if (response.status!==200 && !contacts) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            })
        }
        return Promise.resolve({
            success:mapToDomain(contacts)
        }) 
    }

    async updateContact(params:ContactData): Promise<Resource<boolean>> {
        const response = await baseClient.patch<ContactData>('/contacts/' + params.id, {
            id:params.id,
            name:params.name,
            phone:params.phone
        });
        if (response.status!==200) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            })
        }
        return Promise.resolve({
            success:true
        }) 
    }

    async deleteContact(id:number): Promise<Resource<boolean>> {
        const response = await baseClient.delete('/contacts/' + id);
        if (response.status!==200) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            })
        }
        return Promise.resolve({
            success:true
        })
    }

    async searchContacts(search: string): Promise<Resource<Contact[]>> {
        const response = await baseClient.get<ContactData[]>('/contacts');
        const contacts = response.data.filter((item: { name: string | string[]; phone: string | string[]; }) => item.name.includes(search) || item.phone.includes(search));
        if (response.status!==200 && !contacts) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            })
        }
        return Promise.resolve({
            success:mapToDomain(contacts)
        }) 
    }
    
}