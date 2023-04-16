import { Resource } from "core";

export abstract class AuthRepository {
    abstract signIn(login:string, password:string):Promise<Resource<string>>;
}