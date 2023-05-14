import {describe, expect } from '@jest/globals';
import { ErrorMessages } from 'app/core/common';
import { ContactsRepositoryMockImpl } from './contacts.repository.mock';
import { mapToDomain } from '../mapper';

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

describe('contacts repository test', () => {

    it('create contact should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        const result = await contactsRepository.createContact(testData[0].name, testData[0].phone)
        expect(result.success).toEqual({
            id:1,
            name:'Test Name 1',
            phone:'+79998887766',
            is_edit:false
        })
        expect(result.error).toBeUndefined()
    });

    it('create contact should be error', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        const result = await contactsRepository.createContact('','')
        expect(result.success).toBeUndefined()
        expect(result.error).toBe(ErrorMessages.DBError)
    });

    it('get contacts should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })
        const result = await contactsRepository.getContacts()
        const domainContacts = mapToDomain(testData)
        expect(result.success).toEqual(domainContacts)
        expect(result.error).toBeUndefined()
    });

    it('get contacts should be empty', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        const result = await contactsRepository.getContacts()
        expect(result.success).toEqual([])
        expect(result.error).toBeUndefined()
    });

    it('update contact should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })

        const updateStatus = await contactsRepository.updateContact({
            id:1,
            name:'Test Name 1 updated',
            phone:'+79998887767'
        })
        expect(updateStatus.success).toBe(true)

        const result = await contactsRepository.getContacts()
        expect(result.success?.[0]).toEqual({
            id:1,
            name:'Test Name 1 updated',
            phone:'+79998887767',
            is_edit:false
        })
    });

    it('update contact should be error', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })

        const updateStatus = await contactsRepository.updateContact({
            id:8,
            name:'Test Name 1 updated',
            phone:'+79998887767'
        })
        expect(updateStatus.success).toBeUndefined()
        expect(updateStatus.error).toBe(ErrorMessages.DBError)

        const result = await contactsRepository.getContacts()
        expect(result.success?.[0]).toEqual({
            id:1,
            name:'Test Name 1',
            phone:'+79998887766',
            is_edit:false
        })
    });

    it('delete contact should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })

        const result = await contactsRepository.getContacts()
        expect(result.success?.length).toBe(3)

        const deleteStatus = await contactsRepository.deleteContact(1)
        expect(deleteStatus.success).toBe(true)

        const resultWithoutFirst = await contactsRepository.getContacts()
        expect(resultWithoutFirst.success?.length).toBe(2)
    });

    it('delete contact should be error', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })

        const result = await contactsRepository.getContacts()
        expect(result.success?.length).toBe(3)

        const deleteStatus = await contactsRepository.deleteContact(100)
        expect(deleteStatus.error).toBe(ErrorMessages.DBError)
        expect(deleteStatus.success).toBeUndefined()

        const resultWithoutFirst = await contactsRepository.getContacts()
        expect(resultWithoutFirst.success?.length).toBe(3)
    });

    it('search all contacts should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })
        const result = await contactsRepository.searchContacts('Test Name')
        const domainContacts = mapToDomain(testData)
        expect(result.success).toEqual(domainContacts)
        expect(result.error).toBeUndefined()
    });

    it('search first contact should be success', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })
        const result = await contactsRepository.searchContacts('Test Name 1')
        expect(result.success).toEqual([{
            id:1,
            name:'Test Name 1',
            phone:'+79998887766',
            is_edit:false
        }])
        expect(result.error).toBeUndefined()
    });

    it('search contacts should be empty', async () => {
        const contactsRepository = new ContactsRepositoryMockImpl()
        testData.forEach(async item => {
            await contactsRepository.createContact(item.name,item.phone)
        })
        const result = await contactsRepository.searchContacts('Test Name 1222')
        expect(result.success).toEqual([])
        expect(result.error).toBeUndefined()
    });

});