import { ErrorMessages, FormValidator, Resource } from "app/core/common";
import { ContactsRepository } from "app/data/contacts";
import { Contact } from "../../../model";

export class UpdateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(contact:Contact):Promise<Resource<boolean>> {

        if (!contact.name) {
            return Promise.resolve({
                error:ErrorMessages.NameEmpty
            });
        }

        if (!contact.phone) {
            return Promise.resolve({
                error:ErrorMessages.PhoneEmpty
            });
        }

        if (!FormValidator.isPhoneValid(contact.phone)) {
            return Promise.resolve({
                error:ErrorMessages.PhoneIsNotValid
            });
        }

        return await this.repository.updateContact(contact)
    }
}