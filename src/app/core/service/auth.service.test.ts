import {describe, expect, test} from '@jest/globals';
import { AuthService } from './auth.service';

describe('auth service test', () => {

    it('should be not auth', () => {
        const authService = new AuthService()
        expect(authService.isAuth()).toBe('')
    });

    it('sign in should be success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        expect(authService.isAuth()).toBe(token)
    });

    it('sign out should be success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        authService.signOut()
        expect(authService.isAuth()).toBe('')
    });

    it('set auth should be success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        authService.setAuth()
        expect(authService.isAuth()).toBe(token)
    });

});