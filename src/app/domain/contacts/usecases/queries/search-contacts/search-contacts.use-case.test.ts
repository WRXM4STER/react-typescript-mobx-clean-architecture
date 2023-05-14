import {describe, expect } from '@jest/globals';
import { ContactsRepositoryMockImpl } from 'app/data/contacts/repository/contacts.repository.mock';
import { mapToDomain } from 'app/data/contacts';
import { SearchContactsUseCase } from './search-contacts.use-case';

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

describe('search contacts use-case test', () => {

    const contactsRepositoryMockImpl = new ContactsRepositoryMockImpl()

    beforeAll(() => {
        testData.forEach(async item => {
            await contactsRepositoryMockImpl.createContact(item.name,item.phone)
        })
    })

    it('should be search all success', async () => {
        const searchContactsUseCase = new SearchContactsUseCase(contactsRepositoryMockImpl)
        const result = await searchContactsUseCase.execute('Test Name')
        const domainContacts = mapToDomain(testData)
        expect(result.success).toEqual(domainContacts)
        expect(result.error).toBeUndefined()
    });

    it('search first contact should be success', async () => {
        const searchContactsUseCase = new SearchContactsUseCase(contactsRepositoryMockImpl)
        const result = await searchContactsUseCase.execute('Test Name 1')
        expect(result.success).toEqual([{
            id:1,
            name:'Test Name 1',
            phone:'+79998887766',
            is_edit:false
        }])
        expect(result.error).toBeUndefined()
    });

    it('should be empty list', async () => {
        const searchContactsUseCase = new SearchContactsUseCase(contactsRepositoryMockImpl)
        const result = await searchContactsUseCase.execute('Unknown Name')
        expect(result.success).toEqual([])
        expect(result.error).toBeUndefined()
    });

});