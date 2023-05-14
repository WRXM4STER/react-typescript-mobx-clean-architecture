import { makeAutoObservable, runInAction } from "mobx";
import { AuthUseCase } from "app/domain/auth";
import { AuthViewState } from "./auth-view.state";

export class AuthViewModel {

    private authUseCase:AuthUseCase

    uiState:AuthViewState = {
        email: "",
        password: "",
        error: ""
    }
    
    public constructor(authUseCase:AuthUseCase) {
        this.authUseCase = authUseCase
        this.uiState.email=''
        this.uiState.password=''
        this.uiState.error=''
        makeAutoObservable(this)
    }

    onEmailChanged(loginQuery: string) {
        runInAction(() => {
            this.uiState.email=loginQuery
        })
    }

    onPasswordChanged(passwordQuery: string): void {
        runInAction(() => {
            this.uiState.password=passwordQuery
        })
    }

    async onClickSignIn() {
        const result = await this.authUseCase.execute(this.uiState.email, this.uiState.password)
        runInAction(() => {
            if(result.error) {
                this.uiState.error = result.error
            }
        })
        return result
    }

}