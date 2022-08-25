import { makeAutoObservable } from "mobx";
import { AuthUseCase } from "../../../../domain/interactors/auth.use-case";

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
        const auth = await this.authUseCase.execute(this.email, this.password)
        if(auth.error) {
            this.error = auth.error
        }
    }

}