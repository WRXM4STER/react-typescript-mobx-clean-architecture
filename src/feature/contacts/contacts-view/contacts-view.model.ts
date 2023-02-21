import { makeAutoObservable } from "mobx";
import { CreateContactUseCase } from "domain/contacts/commands/create-contact.use-case";
import { DeleteContactUseCase } from "domain/contacts/commands/delete-contact.use-case";
import { UpdateContactUseCase } from "domain/contacts/commands/update-contact.use-case";
import { GetContactsUseCase } from "domain/contacts/queries/get-contacts.use-case";
import { SearchContactsUseCase } from "domain/contacts/queries/search-contacts.use-case";
import { Contact } from "data/contacts/model/contact.model";

export class ContactsViewModel {

    private getContactsUseCase:GetContactsUseCase
    private createContactUseCase:CreateContactUseCase
    private updateContactUseCase:UpdateContactUseCase
    private deleteContactUseCase:DeleteContactUseCase
    private searchContactsUseCase:SearchContactsUseCase

    contacts:Contact[] = []

    error:string = ''
    search:string = ''
    name:string = ''
    phone:string = ''

    public constructor(
        getContactsUseCase:GetContactsUseCase,
        createContactUseCase:CreateContactUseCase,
        updateContactUseCase:UpdateContactUseCase,
        deleteContactUseCase:DeleteContactUseCase,
        searchContactsUseCase:SearchContactsUseCase
    ) {
        this.getContactsUseCase = getContactsUseCase
        this.createContactUseCase = createContactUseCase
        this.updateContactUseCase = updateContactUseCase
        this.deleteContactUseCase = deleteContactUseCase
        this.searchContactsUseCase = searchContactsUseCase

        makeAutoObservable(this)
    }

    async createContact() {
        const result = await this.createContactUseCase.execute(this.name, this.phone)
        if (result.success) {
            this.contacts.push(result.success)
            this.name = ''
            this.phone = ''
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    async getContacts() {
        const result = await this.getContactsUseCase.execute()
        if (result.success) {
            this.contacts = result.success
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    async updateContact(index:number) {
        const result = await this.updateContactUseCase.execute(this.contacts[index])
        if (result.success) {
            this.contacts[index].is_edit=false
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    async deleteContact(id:number) {
        const result = await this.deleteContactUseCase.execute(id)
        if (result.success) {
            let index = this.contacts.findIndex(item => item.id === id);
            if (index >= 0) this.contacts.splice(index, 1);
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }
    
    async searchContact() {
        const result = await this.searchContactsUseCase.execute(this.search)
        if (result.success) {
            this.contacts = result.success
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    onNewNameChanged(value: string) {
        this.name=value
    }

    onNewPhoneChanged(value: string) {
        this.phone=value
    }

    onNameChanged(index:number, value: string) {
        this.contacts[index].name = value
        this.contacts[index].is_edit = true
    }

    onPhoneChanged(index:number, value: string) {
        this.contacts[index].phone = value
        this.contacts[index].is_edit = true
    }

    onSearchChanged(search: string) {
        this.search=search
    }

    private alertError(error:string) {
        this.error = error
        alert(this.error)
        this.error=''
    }

}