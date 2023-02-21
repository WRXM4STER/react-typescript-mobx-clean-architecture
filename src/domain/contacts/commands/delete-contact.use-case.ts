import { Resource } from "core/common/resource"
import { ContactsRepository } from "data/contacts/repository/contacts.repository"

export class DeleteContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(id:number):Promise<Resource<boolean>> {
        return await this.repository.deleteContact(id)
    }
}