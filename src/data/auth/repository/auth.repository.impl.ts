import { baseClient } from "shared";
import { ErrorMessages } from "core";
import { Resource } from "core";
import { AuthRepository } from "./auth.repository"
import { UserData } from "../model/user-data.model";

export class AuthRepositoryImpl implements AuthRepository {

    async signIn(email: string, password: string): Promise<Resource<string>> {
        const response = await baseClient.get<UserData[]>('/users', {
            params: {
                email,
                password
            }
        });

        if (response.status!==200) {
            return Promise.resolve({
                error:ErrorMessages.DBError
            });
        }

        const user = response.data;

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