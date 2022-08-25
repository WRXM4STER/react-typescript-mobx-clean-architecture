import authStore from "../../../../store/auth.store";
import { ErrorMessages } from "../../../../util/error-messages";
import { Resource } from "../../../../util/resource";
import { AuthRepository } from "../repository/auth.repository"

export class AuthUseCase {

    repository: AuthRepository

    constructor(repository: AuthRepository) {
        this.repository=repository
    }

    public async execute(email:string, password:string):Promise<Resource<string>> {
        
        if (!email) {
            return Promise.resolve({
                error: ErrorMessages.EmailEmpty,
            });
        }

        if (!password) {
            return Promise.resolve({
                error: ErrorMessages.PasswordEmpty,
            });
        }

        const auth = await this.repository.signIn(email,password)

        if (auth.success) {
            authStore.signIn(auth.success)
        } 
        
        return auth
    }
}