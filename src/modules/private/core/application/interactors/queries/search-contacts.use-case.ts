import { Resource } from "../../../../../../util/resource"
import { Contact } from "../../../domain/models/contact.model"
import { ContactsRepository } from "../../repository/contacts.repository"

export class SearchContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(search:string):Promise<Resource<Contact[]>> {
        return await this.repository.searchContacts(search)
    }
}