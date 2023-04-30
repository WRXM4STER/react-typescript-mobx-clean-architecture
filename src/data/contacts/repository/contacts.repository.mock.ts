import { ErrorMessages, Resource } from "core/common";
import { ContactData } from "../model/contact-data.model";
import { Contact } from "../../../domain/contacts/model/contact.model";
import { ContactsRepository } from "./contacts.repository";
import { mapToDomain } from "../mapper";

export class ContactsRepositoryMockImpl extends ContactsRepository {

    private data:ContactData[] = []
    private count = 0

    async createContact(name: string, phone: string): Promise<Resource<Contact>> {
        if (name && phone) {
            this.count++
            const row = {
                id:this.count,
                name,
                phone
            }
            this.data.push(row)
            return Promise.resolve({
                success:{
                    ...row,
                    is_edit:false
                }
            }) 
        }
        return Promise.resolve({
            error:ErrorMessages.DBError
        })
    }

    async getContacts(): Promise<Resource<Contact[]>> {
        return Promise.resolve({
            success:mapToDomain(this.data)
        })
    }

    async updateContact({id, name, phone}: ContactData): Promise<Resource<boolean>> {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                this.data[i].name = name
                this.data[i].phone = phone
                return Promise.resolve({
                    success:true
                })
            }
        }
        return Promise.resolve({
            error:ErrorMessages.DBError
        })
    }

    async deleteContact(id: number): Promise<Resource<boolean>> {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                this.data.splice(i,1)
                return Promise.resolve({
                    success:true
                })
            }
        }
        return Promise.resolve({
            error:ErrorMessages.DBError
        })
    }

    searchContacts(search: string): Promise<Resource<Contact[]>> {
        const contacts = this.data.filter((item: { name: string | string[]; phone: string | string[]; }) => item.name.includes(search) || item.phone.includes(search))
        if (contacts) {
            return Promise.resolve({
                success:mapToDomain(contacts)
            }) 
        }
        return Promise.resolve({
            error:ErrorMessages.DBError
        })
    }

}