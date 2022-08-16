export abstract class AuthRepository {
    abstract signIn(login:string, password:string):Promise<string>;
}