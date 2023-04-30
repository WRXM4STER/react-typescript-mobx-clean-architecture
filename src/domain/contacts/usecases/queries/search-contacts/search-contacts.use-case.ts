import { Resource } from "core/common"
import { ContactsRepository } from "data/contacts"
import { Contact } from "../../../model"

export class SearchContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(search:string):Promise<Resource<Contact[]>> {
        return await this.repository.searchContacts(search)
    }
}