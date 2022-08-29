import React from 'react'
import { observer } from 'mobx-react'
import { ContactsViewModel } from './view-model/contacts.view-model'
import { ContactsRepositoryImpl } from '../../../infrastructure/repository/contacts.repository.impl';
import { GetContactsUseCase } from '../../../core/application/interactors/queries/get-contacts.use-case';
import { CreateContactUseCase } from '../../../core/application/interactors/commands/create-contact.use-case';
import { DeleteContactUseCase } from '../../../core/application/interactors/commands/delete-contact.use-case';
import { UpdateContactUseCase } from '../../../core/application/interactors/commands/update-contact.use-case';
import { SearchContactsUseCase } from '../../../core/application/interactors/queries/search-contacts.use-case';
import { WrapperComponent } from '../../../../../ui-kit-mini/components/wrapper/wrapper.component';
import { InputComponent } from '../../../../../ui-kit-mini/controls/input.component/input.component';
import { ButtonComponent } from '../../../../../ui-kit-mini/controls/button.component/button.component';
import authStore from '../../../../../store/auth.store';

@observer
export default class ContactsView extends React.Component {

    private viewModel: ContactsViewModel;

    constructor(props:any) {
        super(props)
        //data
        const contactsRepository = new ContactsRepositoryImpl()
        //domain
        const getContactsUseCase = new GetContactsUseCase(contactsRepository) 
        const createContactUseCase = new CreateContactUseCase(contactsRepository) 
        const updateContactUseCase = new UpdateContactUseCase(contactsRepository) 
        const deleteContactUseCase = new DeleteContactUseCase(contactsRepository) 
        const searchContactsUseCase = new SearchContactsUseCase(contactsRepository) 
        //presentation
        this.viewModel = new ContactsViewModel(
            getContactsUseCase, 
            createContactUseCase,
            updateContactUseCase,
            deleteContactUseCase,
            searchContactsUseCase
        )
    }

    componentDidMount() {
        document.title = "Контакты"; 
        this.viewModel.getContacts()   
    }

    public render() {

        const {contactsEntity, search,name,phone} = this.viewModel

        const createContact = () => {
            this.viewModel.createContact()
        };

        const update = (index:number) => {
            this.viewModel.updateContact(index)
        };

        const deleteContact = (id:number) => {
            this.viewModel.deleteContact(id)
        };

        const searchContact = () => {
            this.viewModel.searchContact()
        };

        return (
            <WrapperComponent>
                <table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Номер телефона</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <InputComponent 
                                    type="text"  
                                    value={search}
                                    placeholder="Введите фио или номер для поиска"
                                    className="w-full"
                                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                        this.viewModel.onSearchChanged(e.currentTarget.value);
                                    }}
                                />
                            </td>
                            <td>
                                <ButtonComponent type="button" onClick={searchContact}>Найти</ButtonComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <InputComponent
                                    type="text"  
                                    value={name}
                                    placeholder="Введите ФИО" 
                                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                        this.viewModel.onNewNameChanged(e.currentTarget.value);
                                    }}
                                />
                            </td>
                            <td>
                                <InputComponent
                                    type="text" 
                                    value={phone}
                                    placeholder="Введите номер"
                                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                        this.viewModel.onNewPhoneChanged(e.currentTarget.value);
                                    }}
                                />
                            </td>
                            <td>
                                <ButtonComponent type="button" onClick={createContact}>Добавить</ButtonComponent>
                            </td>
                        </tr>
                        {
                            contactsEntity.get().map((item, index) => 
                                <tr key={item.id}>
                                    <td>
                                        <InputComponent 
                                            type="text" 
                                            value={item.name} 
                                            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                                this.viewModel.onNameChanged(index, e.currentTarget.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <InputComponent 
                                            type="text"
                                            value={item.phone}
                                            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                                this.viewModel.onPhoneChanged(index, e.currentTarget.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {item.is_edit && <ButtonComponent type="button" onClick={()=>update(index)}>Сохранить</ButtonComponent>}
                                        <ButtonComponent type="button" onClick={()=>deleteContact(item.id)}>Удалить</ButtonComponent>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <ButtonComponent type="button" variant='danger' className='absolute right-0 top-0 m-1' onClick={()=>authStore.signOut()}>Выход</ButtonComponent>
            </WrapperComponent>
        )

    }
}