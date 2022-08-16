import authStore from "../../../../store/auth.store"
import { AuthRepository } from "../repository/auth.repository"

export class AuthUseCase {

    repository: AuthRepository

    constructor(repository: AuthRepository) {
        this.repository=repository
    }

    public async execute(login:string, password:string):Promise<string> {
        let error = ''
        try {
            const auth = await this.repository.signIn(login,password)
            authStore.signIn(auth)
        } catch (e) {
            if (e instanceof Error) {
                error = e.message
            }
        }
        return error
    }
}