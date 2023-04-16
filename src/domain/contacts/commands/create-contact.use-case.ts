import FormValidator from "core/common/form-validator/form-validator";
import { Resource } from "core/common/resource/resource";
import { ContactsRepository } from "data/contacts/contacts.repository";
import { Contact } from "data/contacts/model/contact.model";


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