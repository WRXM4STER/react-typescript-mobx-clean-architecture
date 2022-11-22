import { Contact } from "../../../../data/repository/models/contact.model";
import { Resource } from "../../../../../../core/application/utils/resource"
import { ContactsRepository } from "../../repository/contacts.repository"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<Resource<Contact[]>> {
        return await this.repository.getContacts()
    }
}