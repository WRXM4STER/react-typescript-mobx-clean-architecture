import authEntity from "../../../../core/entities/auth.entity";
import { ErrorMessages } from "../../../../core/utils/error-messages";
import { Resource } from "../../../../core/utils/resource";
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
            authEntity.signIn(auth.success)
        } 
        
        return auth
    }
}