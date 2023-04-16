import { Resource } from "core"
import { ContactsRepository } from "data"
import { Contact } from "data"

export class SearchContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(search:string):Promise<Resource<Contact[]>> {
        return await this.repository.searchContacts(search)
    }
}