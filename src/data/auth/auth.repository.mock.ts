import { baseClient } from "shared/api/base-client";
import { ErrorMessages } from "core/common/error-messages";
import { Resource } from "core/common/resource";
import { AuthRepository } from "data/auth/auth.repository"
import { UserData } from "./model/user-data.model";

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