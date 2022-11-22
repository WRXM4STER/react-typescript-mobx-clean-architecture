import { Resource } from "../../../../core/application/utils/resource";

export abstract class AuthRepository {
    abstract signIn(login:string, password:string):Promise<Resource<string>>;
}