import {describe, expect, test} from '@jest/globals';
import { AuthService } from './auth.service';

describe('auth service test', () => {

    it('is not auth', () => {
        const authService = new AuthService()
        expect(authService.isAuth()).toBe('')
    });

    it('sign in success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        expect(authService.isAuth()).toBe(token)
    });

    it('sign out success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        authService.signOut()
        expect(authService.isAuth()).toBe('')
    });

    it('set auth success', () => {
        const authService = new AuthService()
        const token = 'random-test-token'
        authService.signIn(token)
        authService.setAuth()
        expect(authService.isAuth()).toBe(token)
    });

});