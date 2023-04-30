import {describe, expect } from '@jest/globals';
import { ContactsRepositoryMockImpl } from 'data/contacts/repository/contacts.repository.mock';
import { CreateContactUseCase } from './create-contact.use-case';

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
        expect(result.error).toBe(undefined)
    });

    it('name is not be empty', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('','+79998887766')
        expect(result.success).toBe(undefined)
        expect(result.error).toBe('ФИО не может быть пустым!')
    });

    it('phone is not be empty', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('Test Name 1','')
        expect(result.success).toBe(undefined)
        expect(result.error).toBe('Введите номер телефона!')
    });

    it('phone is not valid', async () => {
        const createContactUseCase = new CreateContactUseCase(contactsRepositoryMockImpl)
        const result = await createContactUseCase.execute('Test Name 1','not valid number')
        expect(result.success).toBe(undefined)
        expect(result.error).toBe('Номер телефона введен некорректно!')
    });

});