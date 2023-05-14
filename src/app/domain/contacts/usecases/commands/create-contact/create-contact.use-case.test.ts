import {describe, expect } from '@jest/globals';
import { ContactsRepositoryMockImpl } from 'app/data/contacts/repository/contacts.repository.mock';
import { CreateContactUseCase } from './create-contact.use-case';
import { ErrorMessages } from 'app/core/common';

describe('create contact use-case test', () => {

    const contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()

    it('should be success', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('Test Name 1','+79998887766')
        expect(result.success).toEqual({
            id:1,
            name:'Test Name 1',
            phone:'+79998887766',
            is_edit:false
        })
        expect(result.error).toBeUndefined()
    });

    it('name is not be empty', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('','+79998887766')
        expect(result.success).toBe(undefined)
        expect(result.error).toBe(ErrorMessages.NameEmpty)
    });

    it('phone is not be empty', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('Test Name 1','')
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.PhoneEmpty)
    });

    it('phone is not valid', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('Test Name 1','not valid phone')
        expect(result.success).toBe(undefined)
        expect(result.error).toBe(ErrorMessages.PhoneIsNotValid)
    });

});