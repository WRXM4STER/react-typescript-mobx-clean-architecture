import { baseClient } from "../../../../core/application/api/base-client";
import { ErrorMessages } from "../../../../core/application/utils/error-messages";
import { Resource } from "../../../../core/application/utils/resource";
import { AuthRepository } from "../../domain/repository/auth.repository"
import { UserData } from "./models/user-data.model";

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