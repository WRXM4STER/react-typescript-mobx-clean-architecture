import React from 'react'
import { observer } from 'mobx-react'
import { AppContext } from 'app/core/context';
import { AuthViewModel } from './auth-view.model'
import { WrapperComponent, FormComponent, ButtonComponent, InputComponent } from 'app/shared/ui';

interface AuthViewProps {
    viewModel:AuthViewModel
}

@observer
export default class AuthViewComponent extends React.Component<AuthViewProps> {

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    componentDidMount() {
        document.title = "Вход в систему";    
    }

    public render() {
        const {uiState} = this.props.viewModel;

        const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const result = await this.props.viewModel.onClickSignIn()
            if (result.success) {
                this.context.authService?.signIn(result.success)
            }
        }

        return (
            <WrapperComponent>
                <FormComponent onSubmit={submitForm}>
                    <h1>Вход в систему</h1>
                    <h2 className="text-red-500">{uiState.error}</h2>
                    <InputComponent
                        id="username-input"
                        type="text" 
                        placeholder='Логин' 
                        value={uiState.email}
                        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                            this.props.viewModel.onEmailChanged(e.currentTarget.value);
                        }}
                    />
                    <InputComponent 
                        id="password-input"
                        type="text" 
                        placeholder='Пароль'
                        value={uiState.password}
                        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                            this.props.viewModel.onPasswordChanged(e.currentTarget.value);
                        }}
                    />
                    <ButtonComponent type="submit">Войти</ButtonComponent>
                </FormComponent>
            </WrapperComponent>
        )
    }
}