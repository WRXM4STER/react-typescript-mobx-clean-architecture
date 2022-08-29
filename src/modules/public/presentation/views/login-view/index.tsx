import React from 'react'
import { observer } from 'mobx-react'
import { AuthViewModel } from './view-model/auth.view-model'
import { AuthUseCase } from '../../../core/interactors/auth.use-case';
import { AuthRepositoryImpl } from '../../../infrastructure/repository/auth.repository.impl';
import { FormComponent } from '../../components/form.component/form.component';
import { ButtonComponent } from '../../../../../ui-kit-mini/controls/button.component/button.component';
import { InputComponent } from '../../../../../ui-kit-mini/controls/input.component/input.component';
import { WrapperComponent } from '../../../../../ui-kit-mini/components/wrapper/wrapper.component';

@observer
export default class LoginView extends React.Component {

    private authViewModel: AuthViewModel;

    constructor(props:any) {
        super(props)
        //data
        const authRepository = new AuthRepositoryImpl()
        //domain
        const authUseCase = new AuthUseCase(authRepository) 
        //presentation
        this.authViewModel = new AuthViewModel(authUseCase)
    }

    componentDidMount() {
        document.title = "Вход в систему";    
    }

    public render() {
        const {
            email,
            password,
            error
        } = this.authViewModel;

        const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            this.authViewModel.onClickSignIn()
        }

        return (
            <WrapperComponent>
                <FormComponent onSubmit={submitForm}>
                    <h1>Вход в систему</h1>
                    <h2 className="text-red-500">{error}</h2>
                    <InputComponent
                        type="text" 
                        placeholder='Логин' 
                        value={email}
                        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                            this.authViewModel.onEmailChanged(e.currentTarget.value);
                        }}
                    />
                    <InputComponent 
                        type="text" 
                        placeholder='Пароль'
                        value={password}
                        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                            this.authViewModel.onPasswordChanged(e.currentTarget.value);
                        }}
                    />
                    <ButtonComponent type="submit">Войти</ButtonComponent>
                </FormComponent>
            </WrapperComponent>
        )
    }
}