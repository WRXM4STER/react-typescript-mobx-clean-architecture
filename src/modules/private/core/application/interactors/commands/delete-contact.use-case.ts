import { Resource } from "../../../../../../core/utils/resource"
import { ContactsRepository } from "../../repository/contacts.repository"

export class DeleteContactUseCase {

    repository: ContactsRepository

    constructor(repository: ContactsRepository) {
        this.repository=repository
    }

    public async execute(id:number):Promise<Resource<boolean>> {
        return await this.repository.deleteContact(id)
    }
}