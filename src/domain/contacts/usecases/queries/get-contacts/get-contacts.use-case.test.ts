import {describe, expect } from '@jest/globals';
import { ErrorMessages } from 'core/common';
import { ContactsRepositoryMockImpl } from 'data/contacts/repository/contacts.repository.mock';
import { GetContactsUseCase } from './get-contacts.use-case';
import { mapToDomain } from 'data/contacts';

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

describe('get contacts use-case test', () => {

    let contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()

    beforeEach(()=>{
        contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()
    })

    it('should be success', async () => {
        testData.forEach(async item => {
            await contactsRepositoryMockImpl.createContact(item.name,item.phone)
        })
        const getContactsUseCase = new GetContactsUseCase(contactsRepositoryMockImpl)
        const result = await getContactsUseCase.execute()
        const domainContacts = mapToDomain(testData)
        expect(result.success).toEqual(domainContacts)
        expect(result.error).toBeUndefined()
    });

    it('should be empty list', async () => {
        const getContactsUseCase = new GetContactsUseCase(contactsRepositoryMockImpl)
        const result = await getContactsUseCase.execute()
        expect(result.success).toEqual([])
        expect(result.error).toBeUndefined()
    });

});