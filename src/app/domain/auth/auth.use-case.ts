import { ErrorMessages, Resource } from "app/core/common";
import { AuthRepository } from "app/data/auth";

export class AuthUseCase {

    private repository: AuthRepository

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
        
        return auth
    }
}