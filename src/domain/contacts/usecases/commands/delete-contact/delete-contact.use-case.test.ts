import {describe, expect } from '@jest/globals';
import { ContactsRepositoryMockImpl } from 'data/contacts/repository/contacts.repository.mock';
import { DeleteContactUseCase } from './delete-contact.use-case';
import { ErrorMessages } from 'core/common';

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

describe('delete contact use-case test', () => {

    let contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()

    beforeEach(() => {
        contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepositoryMockImpl.createContact(item.name,item.phone)
        })
    })

    it('should be success', async () => {
        const deleteContactUseCase = new DeleteContactUseCase(contactsRepositoryMockImpl)
        const result = await contactsRepositoryMockImpl.getContacts()
        expect(result.success?.length).toBe(3)

        const deleteStatus = await deleteContactUseCase.execute(1)
        expect(deleteStatus.success).toBe(true)

        const resultWithoutFirst = await contactsRepositoryMockImpl.getContacts()
        expect(resultWithoutFirst.success?.length).toBe(2)
    });

    it('should be error', async () => {
        const deleteContactUseCase = new DeleteContactUseCase(contactsRepositoryMockImpl)

        const result = await contactsRepositoryMockImpl.getContacts()
        expect(result.success?.length).toBe(3)

        const deleteStatus = await deleteContactUseCase.execute(100)
        expect(deleteStatus.error).toBe(ErrorMessages.DBError)
        expect(deleteStatus.success).toBe(undefined)

        const resultWithoutFirst = await contactsRepositoryMockImpl.getContacts()
        expect(resultWithoutFirst.success?.length).toBe(3)
    });

});