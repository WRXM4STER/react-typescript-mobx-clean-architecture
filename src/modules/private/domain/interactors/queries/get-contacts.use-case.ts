import contactsEntity from "../../entity/contacts.entity"
import { ContactsRepository } from "../../repository/contacts.repository"

export class GetContactsUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute():Promise<string> {
        let error = ''
        try {
            const contacts = await this.repository.getContacts()
            contactsEntity.set(contacts)
        } catch (e) {
            if (e instanceof Error) {
                error = e.message
            }
        }
        return error
    }
}