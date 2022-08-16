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
        if (!this.validateForm()) {
            return;
        }
        this.error = await this.authUseCase.execute(this.email, this.password)
    }

    private validateForm = (): boolean => {

        if (!this.email) {
            this.error = 'Логин не может быть пустым!';
            return false;
        }

        if (!this.password) {
            this.error = 'Введите пароль!';
            return false;
        }

        this.error = ''
        return true
    }

}