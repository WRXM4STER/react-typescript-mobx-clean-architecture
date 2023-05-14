import {describe, expect, test} from '@jest/globals';
import { ErrorMessages } from './error-messages';
import { expectEnum } from 'expect-enum';
    
describe('enum-test', () => {

    it('enum DBError test', () => {
        expect({ type: ErrorMessages.DBError }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum EmailEmpty test', () => {
        expect({ type: ErrorMessages.EmailEmpty }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum PasswordEmpty test', () => {
        expect({ type: ErrorMessages.PasswordEmpty }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum SignInError test', () => {
        expect({ type: ErrorMessages.SignInError }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum NameEmpty test', () => {
        expect({ type: ErrorMessages.NameEmpty }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum PhoneEmpty test', () => {
        expect({ type: ErrorMessages.PhoneEmpty }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

    it('enum PhoneIsNotValid test', () => {
        expect({ type: ErrorMessages.PhoneIsNotValid }).toMatchObject({ type: expectEnum(ErrorMessages) });
    });

});