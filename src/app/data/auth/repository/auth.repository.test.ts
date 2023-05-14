import {describe, expect } from '@jest/globals';
import { AuthRepositoryMockImpl } from './auth.repository.mock';
import { ErrorMessages } from 'app/core/common';

describe('auth repository test', () => {

    it('should be success', async () => {
        const authRepository = new AuthRepositoryMockImpl();
        const result = await authRepository.signIn('test@email.com','qwerty');
        expect(result.success).toBe('random_access_token')
        expect(result.error).toBeUndefined()
    });

    it('should be error', async () => {
        const authRepository = new AuthRepositoryMockImpl();
        const result = await authRepository.signIn('test@email.com','wrongpassword');
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.SignInError)
    });

});