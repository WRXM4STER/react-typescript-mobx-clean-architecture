import React from 'react'
import { observer } from 'mobx-react'
import { AuthViewModel } from './auth-view.model'
import { FormComponent } from 'shared/ui/form.component/form.component';
import { ButtonComponent } from 'shared/ui/button/button.component';
import { WrapperComponent } from 'shared/ui/wrapper/wrapper.component';
import { InputComponent } from 'shared/ui/input/input.component';
import { AppContext } from 'core/context/app-context';


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
        const {
            email,
            password,
            error
        } = this.props.viewModel;

        const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const result = await this.props.viewModel.onClickSignIn()
            if (result.success) {
                this.context.authEntity?.signIn(result.success)
            }
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
                            this.props.viewModel.onEmailChanged(e.currentTarget.value);
                        }}
                    />
                    <InputComponent 
                        type="text" 
                        placeholder='Пароль'
                        value={password}
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