import contactsEntity from "../../entity/contacts.entity"
import { ContactsRepository } from "../../repository/contacts.repository"

export class DeleteContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(id:number):Promise<string> {
        let error = ''
        try {
            const is_delete = await this.repository.deleteContact(id)
            if (is_delete) {
                contactsEntity.delete(id)
            }
        } catch (e) {
            if (e instanceof Error) {
                error = e.message
            }
        }
        return error
    }
}