import { describe } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactsRepositoryMockImpl } from 'data/contacts/repository/contacts.repository.mock';
import { CreateContactUseCase, DeleteContactUseCase, GetContactsUseCase, SearchContactsUseCase, UpdateContactUseCase } from 'domain/contacts';
import { ContactsViewModel } from './contacts-view.model';
import ContactsViewComponent from './contacts-view.component';

const dependencyInjection = () => {
    //data
    const contactsRepository = new ContactsRepositoryMockImpl()
    //domain
    const getContactsUseCase = new GetContactsUseCase(contactsRepository) 
    const createContactUseCase = new CreateContactUseCase(contactsRepository) 
    const updateContactUseCase = new UpdateContactUseCase(contactsRepository) 
    const deleteContactUseCase = new DeleteContactUseCase(contactsRepository) 
    const searchContactsUseCase = new SearchContactsUseCase(contactsRepository) 
    //presentation
    return new ContactsViewModel(
        getContactsUseCase, 
        createContactUseCase,
        updateContactUseCase,
        deleteContactUseCase,
        searchContactsUseCase
    )
}

let viewModel = dependencyInjection()

describe('contacts-view component test', () => {

    beforeEach(()=>{
        viewModel = dependencyInjection()
    })

    it('render contacts-view component', () => {
        render(<ContactsViewComponent viewModel={viewModel}/>)
        expect(screen.queryByText(/Выход/)).toBeInTheDocument()
    });

    it('should create new contact success', async () => {
        render(<ContactsViewComponent viewModel={viewModel}/>)

        userEvent.type(screen.getByLabelText('new-name-input'), 'TestName')
        userEvent.type(screen.getByLabelText('new-phone-input'), '+79998887766')

        const button = screen.getByText('Добавить')

        userEvent.click(button)

        expect(await screen.findByDisplayValue(/TestName/)).toBeInTheDocument()
        expect(await screen.findByDisplayValue(/79998887766/)).toBeInTheDocument()
    });

    it('should create new contact with phone error', async () => {
        const mockAlert = jest.fn()
        window.alert = mockAlert

        render(<ContactsViewComponent viewModel={viewModel}/>)

        userEvent.type(screen.getByLabelText('new-name-input'), 'TestName')
        userEvent.type(screen.getByLabelText('new-phone-input'), 'not valid number')

        const button = screen.getByText('Добавить')

        userEvent.click(button)

        const resultName = await screen.findAllByDisplayValue(/TestName/)
        const resultPhone = await screen.findAllByDisplayValue(/not valid number/)

        expect(resultName[1]).toBeUndefined()
        expect(resultPhone[1]).toBeUndefined()

        expect(mockAlert).toHaveBeenCalledTimes(1)
        expect(mockAlert).toBeCalledWith('Номер телефона введен некорректно!')
    });

    it('should find created contact success', async () => {
        render(<ContactsViewComponent viewModel={viewModel}/>)

        userEvent.type(screen.getByLabelText('new-name-input'), 'TestName')
        userEvent.type(screen.getByLabelText('new-phone-input'), '+79998887766')
        const buttonAdd = screen.getByText('Добавить')
        userEvent.click(buttonAdd)

        userEvent.type(screen.getByLabelText('search-input'), 'TestName')
        const buttonSearch = screen.getByText('Найти')
        userEvent.click(buttonSearch)

        const result = screen.getAllByDisplayValue(/TestName/)

        expect(result[1]).toBeInTheDocument()
    });

    it('should edit contact success', async () => {
        render(<ContactsViewComponent viewModel={viewModel}/>)

        userEvent.type(screen.getByLabelText('new-name-input'), 'TestName')
        userEvent.type(screen.getByLabelText('new-phone-input'), '+79998887766')
        const buttonAdd = screen.getByText('Добавить')
        userEvent.click(buttonAdd)

        userEvent.type(await screen.findByLabelText('name-input-1'), 'TestName edit')
        const buttonEdit = await screen.findByText('Сохранить')
        userEvent.click(buttonEdit)

        userEvent.type(screen.getByLabelText('search-input'), 'TestName edit')
        const buttonSearch = screen.getByText('Найти')
        userEvent.click(buttonSearch)

        const result = screen.getAllByDisplayValue(/TestName edit/)

        expect(result[0]).toBeInTheDocument()
    });

    it('should delete contact success', async () => {
        render(<ContactsViewComponent viewModel={viewModel}/>)

        userEvent.type(screen.getByLabelText('new-name-input'), 'TestName')
        userEvent.type(screen.getByLabelText('new-phone-input'), '+79998887766')
        const buttonAdd = screen.getByText('Добавить')
        userEvent.click(buttonAdd)

        const buttonDelete = await screen.findByText('Удалить')
        userEvent.click(buttonDelete)

        const result = await screen.findByDisplayValue(/TestName/) 
        expect(result).toBeUndefined()
    });

})