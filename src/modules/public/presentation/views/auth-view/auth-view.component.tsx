import React from 'react'
import { observer } from 'mobx-react'
import { AuthViewModel } from './auth-view.model'
import { FormComponent } from '../../components/form.component/form.component';
import { ButtonComponent } from '../../../../../core-ui/controls/button/button.component';
import { WrapperComponent } from '../../../../../core-ui/components/wrapper/wrapper.component';
import { InputComponent } from '../../../../../core-ui/controls/input/input.component';


interface AuthViewProps {
    viewModel:AuthViewModel
}

@observer
export default class AuthViewComponent extends React.Component<AuthViewProps> {

    componentDidMount() {
        document.title = "Вход в систему";    
    }

    public render() {
        const {
            email,
            password,
            error
        } = this.props.viewModel;

        const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            this.props.viewModel.onClickSignIn()
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