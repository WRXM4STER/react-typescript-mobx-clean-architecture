import { Resource } from "../../../../../../core/utils/resource"
import { Contact } from "../../../domain/models/contact.model"
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