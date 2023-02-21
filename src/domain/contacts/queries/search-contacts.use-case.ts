import { Contact } from "data/contacts/repository/model/contact.model";
import { Resource } from "core/common/resource"
import { ContactsRepository } from "data/contacts/repository/contacts.repository"

export class SearchContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(search:string):Promise<Resource<Contact[]>> {
        return await this.repository.searchContacts(search)
    }
}