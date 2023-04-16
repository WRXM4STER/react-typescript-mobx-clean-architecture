import {describe, expect, test} from '@jest/globals';
import { ErrorMessages } from './error-messages';
import { expectEnum } from '../util/expect-enum';
    
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

});