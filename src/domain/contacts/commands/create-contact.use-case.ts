import { Contact } from "data/contacts/repository/model/contact.model";
import FormValidator from "core/common/form-validator";
import { Resource } from "core/common/resource";
import { ContactsRepository } from "data/contacts/repository/contacts.repository"

export class CreateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(name:string,phone:string):Promise<Resource<Contact>> {
        
        if (!name) {
            return Promise.resolve({
                error:'ФИО не может быть пустым!'
            });
        }

        if (!phone) {
            return Promise.resolve({
                error:'Введите номер телефона!'
            });
        }

        if (!FormValidator.isPhoneValid(phone)) {
            return Promise.resolve({
                error:'Номер телефона введен некорректно!'
            });
        }

        return await this.repository.createContact(name,phone)
    }
}