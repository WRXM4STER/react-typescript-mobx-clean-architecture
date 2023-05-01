import { describe } from '@jest/globals';
import { ErrorMessages } from 'core/common';
import { AuthRepositoryMockImpl } from 'data/auth';
import { render, screen } from '@testing-library/react';
import { AuthUseCase } from 'domain/auth';
import { AuthViewModel } from './auth-view.model';
import AuthViewComponent from './auth-view.component';
import userEvent from '@testing-library/user-event';

const authRepository = new AuthRepositoryMockImpl()
const authUseCase = new AuthUseCase(authRepository) 
const authViewModel = new AuthViewModel(authUseCase)

describe('auth-view component test', () => {

    it('render auth-view component', () => {
        render(<AuthViewComponent viewModel={authViewModel}/>)
        expect(screen.queryByText(/Вход в систему/)).toBeInTheDocument()
    });

    it('should show error message when username empty', async () => {
        render(<AuthViewComponent viewModel={authViewModel}/>)
        
        userEvent.type(screen.getByLabelText('username-input'),'')
        userEvent.type(screen.getByLabelText('password-input'),'')

        const button = screen.getByRole('button')

        userEvent.click(button)

        expect(await screen.findByText(/Логин не может быть пустым!/)).toBeInTheDocument()
    });

    it('should show error message when password empty', async () => {
        render(<AuthViewComponent viewModel={authViewModel}/>)
        
        userEvent.type(screen.getByLabelText('username-input'),'wrong_name')
        userEvent.type(screen.getByLabelText('password-input'),'')

        const button = screen.getByRole('button')

        userEvent.click(button)

        expect(await screen.findByText(/Пароль не может быть пустым!/)).toBeInTheDocument()
    });

    it('should show error message when login failed', async () => {
        render(<AuthViewComponent viewModel={authViewModel}/>)
        
        userEvent.type(screen.getByLabelText('username-input'),'wrong_name')
        userEvent.type(screen.getByLabelText('password-input'),'wrong_password')

        const button = screen.getByRole('button')

        userEvent.click(button)

        expect(await screen.findByText(/Неверный логин или пароль!/)).toBeInTheDocument()
    });

})