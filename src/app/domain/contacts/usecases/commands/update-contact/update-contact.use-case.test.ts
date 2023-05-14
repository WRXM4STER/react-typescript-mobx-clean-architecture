import {describe, expect } from '@jest/globals';
import { ContactsRepositoryMockImpl } from 'app/data/contacts/repository/contacts.repository.mock';
import { ErrorMessages } from 'app/core/common';
import { UpdateContactUseCase } from './update-contact.use-case';

const testData = [
    {
        id:1,
        name:'Test Name 1',
        phone:'+79998887766',
    },
    {
        id:2,
        name:'Test Name 2',
        phone:'+79998887755',
    },
    {
        id:3,
        name:'Test Name 3',
        phone:'+79998887744',
    }
]

describe('update contact use-case test', () => {

    let contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()

    beforeEach(() => {
        contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepositoryMockImpl.createContact(item.name,item.phone)
        })
    })

    it('should be success', async () => {
        const updateContactUseCase = new UpdateContactUseCase(contactsRepositoryMockImpl)
        const updateStatus = await updateContactUseCase.execute({
            id:1,
            name:'Test Name 1 updated',
            phone:'+79998887767',
            is_edit:true
        })
        expect(updateStatus.success).toBe(true)

        const result = await contactsRepositoryMockImpl.getContacts()
        expect(result.success?.[0]).toEqual({
            id:1,
            name:'Test Name 1 updated',
            phone:'+79998887767',
            is_edit:false
        })
    });

    it('name is not be empty', async () => {
        const updateContactUseCase = new UpdateContactUseCase(contactsRepositoryMockImpl)
        const result = await updateContactUseCase.execute({
            id:1,
            name:'',
            phone:'+79998887767',
            is_edit:true
        })
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.NameEmpty)
    });

    it('phone is not be empty', async () => {
        const updateContactUseCase = new UpdateContactUseCase(contactsRepositoryMockImpl)
        const result = await updateContactUseCase.execute({
            id:1,
            name:'Test Name 1 updated',
            phone:'',
            is_edit:true
        })
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.PhoneEmpty)
    });

    it('phone is not valid', async () => {
        const updateContactUseCase = new UpdateContactUseCase(contactsRepositoryMockImpl)
        const result = await updateContactUseCase.execute({
            id:1,
            name:'Test Name 1 updated',
            phone:'not valid phone',
            is_edit:true
        })
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.PhoneIsNotValid)
    });

});