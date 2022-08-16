import { baseClient } from "../../../../base-client";
import { AuthRepository } from "../../domain/repository/auth.repository"
import { UserData } from "./models/user-data.model";

export class AuthRepositoryImpl implements AuthRepository {

    async signIn(email: string, password: string): Promise<string> {
        const response = await baseClient.get<UserData[]>('/users',{
            params: {
                email,
                password
            }
        });
        const user = response.data;
        if (response.status!==200 || user.length===0) {
            throw new Error()
        }
        return 'random_access_token'
    }

}