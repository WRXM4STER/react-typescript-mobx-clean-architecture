import FormValidator from "../../../../../form-validator"
import contactsEntity from "../../entity/contacts.entity"
import { ContactsRepository } from "../../repository/contacts.repository"

export class UpdateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(index:number):Promise<string> {
        let error = ''
        try {
            const contact = contactsEntity.get()[index]

            if (!contact.name) {
                error = 'ФИО не может быть пустым!';
            }
    
            if (!contact.phone) {
                error = 'Введите номер телефона!';
            }
    
            if (!FormValidator.isPhoneValid(contact.phone)) {
                error = 'Номер телефона введен некорректно!';
            }
    
            if (!error) {
                const is_update = await this.repository.updateContact(contact)
                if (is_update) {
                    contactsEntity.update(index)
                }
            }

        } catch (e) {
            if (e instanceof Error) {
                error = e.message
            }
        }
        return error
    }
}