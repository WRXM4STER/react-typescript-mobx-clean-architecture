import { Contact } from "data/contacts/repository/model/contact.model";
import { Resource } from "core/common/resource"
import { ContactsRepository } from "data/contacts/repository/contacts.repository"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<Resource<Contact[]>> {
        return await this.repository.getContacts()
    }
}