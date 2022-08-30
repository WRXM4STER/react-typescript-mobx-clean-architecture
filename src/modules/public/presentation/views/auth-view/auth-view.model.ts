import { makeAutoObservable } from "mobx";
import { AuthUseCase } from "../../../core/interactors/auth.use-case";

export class AuthViewModel {

    private authUseCase:AuthUseCase

    public email: string;
    public password: string;
    public error: string;
    
    public constructor(authUseCase:AuthUseCase) {
        this.authUseCase = authUseCase
        this.email=''
        this.password=''
        this.error=''
        makeAutoObservable(this)
    }

    onEmailChanged(loginQuery: string) {
        this.email=loginQuery
    }

    onPasswordChanged(passwordQuery: string): void {
        this.password=passwordQuery
    }

    async onClickSignIn() {
        const result = await this.authUseCase.execute(this.email, this.password)
        if(result.error) {
            this.error = result.error
        }
    }

}