import contactsEntity from "../../entity/contacts.entity"
import { ContactsRepository } from "../../repository/contacts.repository"

export class CreateContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(name:string,phone:string):Promise<string> {
        let error = ''
        try {
            const contact = await this.repository.createContact(name,phone)
            contactsEntity.create(contact)
        } catch (e) {
            if (e instanceof Error) {
                error = e.message
            }
        }
        return error
    }
}