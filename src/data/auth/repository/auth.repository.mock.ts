import { ErrorMessages } from "core";
import { Resource } from "core";
import { AuthRepository } from "./auth.repository"

export class AuthRepositoryMockImpl implements AuthRepository {

    async signIn(email: string, password: string): Promise<Resource<string>> {

        if (email === 'test@email.com' && password === 'qwerty') {
            return Promise.resolve({
                success:'random_access_token'
            });
        }

        return Promise.resolve({
            error:ErrorMessages.SignInError
        });
 
    }

}