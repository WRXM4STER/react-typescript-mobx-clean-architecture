import { Resource } from "core"
import { ContactsRepository } from "data"
import { Contact } from "data"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<Resource<Contact[]>> {
        return await this.repository.getContacts()
    }
}