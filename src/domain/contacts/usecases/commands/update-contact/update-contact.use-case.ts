import { FormValidator, Resource } from "core/common";
import { ContactsRepository } from "data/contacts";
import { Contact } from "../../../model";

export class UpdateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(contact:Contact):Promise<Resource<boolean>> {

        if (!contact.name) {
            return Promise.resolve({
                error:'ФИО не может быть пустым!'
            });
        }

        if (!contact.phone) {
            return Promise.resolve({
                error:'Введите номер телефона!'
            });
        }

        if (!FormValidator.isPhoneValid(contact.phone)) {
            return Promise.resolve({
                error:'Номер телефона введен некорректно!'
            });
        }

        return await this.repository.updateContact(contact)
    }
}