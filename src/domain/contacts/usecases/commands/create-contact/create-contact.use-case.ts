import { ErrorMessages, FormValidator, Resource } from "core/common";
import { ContactsRepository } from "data/contacts";
import { Contact } from "../../../model";

export class CreateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(name:string,phone:string):Promise<Resource<Contact>> {
        
        if (!name) {
            return Promise.resolve({
                error:ErrorMessages.NameEmpty
            });
        }

        if (!phone) {
            return Promise.resolve({
                error:ErrorMessages.PhoneEmpty
            });
        }

        if (!FormValidator.isPhoneValid(phone)) {
            return Promise.resolve({
                error:ErrorMessages.PhoneIsNotValid
            });
        }

        return await this.repository.createContact(name,phone)
    }
}