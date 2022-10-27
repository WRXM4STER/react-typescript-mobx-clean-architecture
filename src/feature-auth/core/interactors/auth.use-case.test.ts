import {describe, expect, test} from '@jest/globals';
import { ErrorMessages } from '../../../core/application/utils/error-messages';
import { AuthRepositoryMockImpl } from '../../infrastructure/repository/auth.repository.mock';
import { AuthUseCase } from './auth.use-case';

describe('auth use-case', () => {

    const authRepositoryMock=new AuthRepositoryMockImpl()

    it('sign-in is success', () => {
        const authUseCase = new AuthUseCase(authRepositoryMock)
        expect(authUseCase.execute('test@email.com','qwerty')).toBe(true);
    });

    it('sign-in is failed', async () => {
        const authUseCase = new AuthUseCase(authRepositoryMock)
        const result = await authUseCase.execute('test@email.com','284425')
        expect(result).toEqual({error:ErrorMessages.SignInError});
    });

})