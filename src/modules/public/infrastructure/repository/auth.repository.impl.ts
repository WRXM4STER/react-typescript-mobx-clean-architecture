import { baseClient } from "../../../../core/application/api/base-client";
import { ErrorMessages } from "../../../../core/application/utils/error-messages";
import { Resource } from "../../../../core/application/utils/resource";


import { AuthRepository } from "../../core/repository/auth.repository"

import { UserData } from "./models/user-data.model";

export class AuthRepositoryImpl implements AuthRepository {

    async signIn(email: string, password: string): Promise<Resource<string>> {
        const response = await baseClient.get<UserData[]>('/users', {
            params: {
                email,
                password
            }
        });

        const user = response.data;

        if (response.status!==200) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            });
        }

        if (user.length===0) {
            return Promise.resolve({
                error:ErrorMessages.SignInError
            });
        }

        return Promise.resolve({
            success:'random_access_token'
        });
    }

}