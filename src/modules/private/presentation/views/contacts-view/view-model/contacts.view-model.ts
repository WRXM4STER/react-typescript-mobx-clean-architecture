import { makeAutoObservable } from "mobx";
import FormValidator from "../../../../../../form-validator";
import contactsEntity from "../../../../domain/entity/contacts.entity";
import { CreateContactUseCase } from "../../../../domain/interactors/commands/create-contact.use-case";
import { DeleteContactUseCase } from "../../../../domain/interactors/commands/delete-contact.use-case";
import { UpdateContactUseCase } from "../../../../domain/interactors/commands/update-contact.use-case";
import { GetContactsUseCase } from "../../../../domain/interactors/queries/get-contacts.use-case";
import { SearchContactsUseCase } from "../../../../domain/interactors/queries/search-contacts.use-case";

export class ContactsViewModel {

    private getContactsUseCase:GetContactsUseCase
    private createContactUseCase:CreateContactUseCase
    private updateContactUseCase:UpdateContactUseCase
    private deleteContactUseCase:DeleteContactUseCase
    private searchContactsUseCase:SearchContactsUseCase

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
        if (!this.validateForm()) {
            alert(this.error)
            this.error=''
            return;
        }
        this.error = await this.createContactUseCase.execute(this.name, this.phone)
        this.alertError()
        this.name = ''
        this.phone = ''
    }

    async getContacts() {
        this.error = await this.getContactsUseCase.execute()
        this.alertError()
    }

    async updateContact(index:number) {
        this.error = await this.updateContactUseCase.execute(index)
        this.alertError()
    }

    async deleteContact(id:number) {
        this.error = await this.deleteContactUseCase.execute(id)
        this.alertError()
    }
    
    async searchContact() {
        this.error = await this.searchContactsUseCase.execute(this.search)
        this.alertError()
    }

    onNewNameChanged(value: string) {
        this.name=value
    }

    onNewPhoneChanged(value: string) {
        this.phone=value
    }

    onNameChanged(index:number, value: string) {
        contactsEntity.onNameChanged(index,value)
    }

    onPhoneChanged(index:number, value: string) {
        contactsEntity.onPhoneChanged(index,value)
    }

    onSearchChanged(search: string) {
        this.search=search
    }

    private validateForm = (): boolean => {

        if (!this.name) {
            this.error = 'ФИО не может быть пустым!';
            return false;
        }

        if (!this.phone) {
            this.error = 'Введите номер телефона!';
            return false;
        }

        if (!FormValidator.isPhoneValid(this.phone)) {
            this.error = 'Номер телефона введен некорректно!';
            return false;
        }

        this.error = ''
        return true
    }

    private alertError() {
        if (this.error) {
            alert(this.error)
            this.error=''
        }
    }

}