import { Resource } from "core/common/resource";

export abstract class AuthRepository {
    abstract signIn(login:string, password:string):Promise<Resource<string>>;
}