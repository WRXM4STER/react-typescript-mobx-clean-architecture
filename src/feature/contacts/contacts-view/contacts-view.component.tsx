import React from 'react'
import { observer } from 'mobx-react'
import { ContactsViewModel } from './contacts-view.model'
import { WrapperComponent } from 'shared/ui/wrapper/wrapper.component';
import { InputComponent } from 'shared/ui/input/input.component';
import { ButtonComponent } from 'shared/ui/button/button.component';
import { AppContext } from 'core/context/app-context';


interface ContactsViewProps {
    viewModel:ContactsViewModel
}

@observer
export default class ContactsViewComponent extends React.Component<ContactsViewProps> {

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    componentDidMount() {
        document.title = "Контакты"; 
        this.props.viewModel.getContacts()   
    }

    public render() {

        const {authService} = this.context;

        const {contactsEntity, search,name,phone} = this.props.viewModel

        const createContact = () => {
            this.props.viewModel.createContact()
        };

        const update = (index:number) => {
            this.props.viewModel.updateContact(index)
        };

        const deleteContact = (id:number) => {
            this.props.viewModel.deleteContact(id)
        };

        const searchContact = () => {
            this.props.viewModel.searchContact()
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
                                        this.props.viewModel.onSearchChanged(e.currentTarget.value);
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
                                        this.props.viewModel.onNewNameChanged(e.currentTarget.value);
                                    }}
                                />
                            </td>
                            <td>
                                <InputComponent
                                    type="text" 
                                    value={phone}
                                    placeholder="Введите номер"
                                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                        this.props.viewModel.onNewPhoneChanged(e.currentTarget.value);
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
                                                this.props.viewModel.onNameChanged(index, e.currentTarget.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <InputComponent 
                                            type="text"
                                            value={item.phone}
                                            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                                                this.props.viewModel.onPhoneChanged(index, e.currentTarget.value);
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
                <ButtonComponent type="button" variant='danger' className='absolute right-0 top-0 m-1' onClick={()=>authService?.signOut()}>Выход</ButtonComponent>
            </WrapperComponent>
        )

    }
}