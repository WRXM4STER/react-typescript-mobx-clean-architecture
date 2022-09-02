import { Resource } from "../../../../core/utils/resource";

export abstract class AuthRepository {
    abstract signIn(login:string, password:string):Promise<Resource<string>>;
}