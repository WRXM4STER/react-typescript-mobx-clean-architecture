import { Resource } from "app/core/common"
import { ContactsRepository } from "app/data/contacts"
import { Contact } from "../../../model"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<Resource<Contact[]>> {
        return await this.repository.getContacts()
    }
}