import { Resource } from "core/common/resource/resource"
import { ContactsRepository } from "data/contacts/contacts.repository"
import { Contact } from "data/contacts/model/contact.model"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<Resource<Contact[]>> {
        return await this.repository.getContacts()
    }
}