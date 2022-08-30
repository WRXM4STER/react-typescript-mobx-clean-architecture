import { makeAutoObservable } from "mobx";
import ContactsEntity from "../../../core/domain/entity/contacts.entity";
import { CreateContactUseCase } from "../../../core/application/interactors/commands/create-contact.use-case";
import { DeleteContactUseCase } from "../../../core/application/interactors/commands/delete-contact.use-case";
import { UpdateContactUseCase } from "../../../core/application/interactors/commands/update-contact.use-case";
import { GetContactsUseCase } from "../../../core/application/interactors/queries/get-contacts.use-case";
import { SearchContactsUseCase } from "../../../core/application/interactors/queries/search-contacts.use-case";

export class ContactsViewModel {

    private getContactsUseCase:GetContactsUseCase
    private createContactUseCase:CreateContactUseCase
    private updateContactUseCase:UpdateContactUseCase
    private deleteContactUseCase:DeleteContactUseCase
    private searchContactsUseCase:SearchContactsUseCase

    contactsEntity:ContactsEntity

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

        this.contactsEntity = new ContactsEntity()

        makeAutoObservable(this)
    }

    async createContact() {
        const result = await this.createContactUseCase.execute(this.name, this.phone)
        if (result.success) {
            this.contactsEntity.create(result.success)
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
            this.contactsEntity.set(result.success)
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    async updateContact(index:number) {
        const result = await this.updateContactUseCase.execute(this.contactsEntity.get()[index])
        if (result.success) {
            this.contactsEntity.update(index)
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }

    async deleteContact(id:number) {
        const result = await this.deleteContactUseCase.execute(id)
        if (result.success) {
            this.contactsEntity.delete(id)
        }
        if (result.error) {
            this.alertError(result.error)
        }
    }
    
    async searchContact() {
        const result = await this.searchContactsUseCase.execute(this.search)
        if (result.success) {
            this.contactsEntity.set(result.success)
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
        this.contactsEntity.onNameChanged(index,value)
    }

    onPhoneChanged(index:number, value: string) {
        this.contactsEntity.onPhoneChanged(index,value)
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