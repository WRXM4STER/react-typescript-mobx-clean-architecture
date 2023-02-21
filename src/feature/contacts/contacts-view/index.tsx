import { CreateContactUseCase } from "domain/contacts/commands/create-contact.use-case"
import { DeleteContactUseCase } from "domain/contacts/commands/delete-contact.use-case"
import { UpdateContactUseCase } from "domain/contacts/commands/update-contact.use-case"
import { GetContactsUseCase } from "domain/contacts/queries/get-contacts.use-case"
import { SearchContactsUseCase } from "domain/contacts/queries/search-contacts.use-case"
import { ContactsRepositoryImpl } from "data/contacts/repository/contacts.repository.impl"
import ContactsViewComponent from "./contacts-view.component"
import { ContactsViewModel } from "./contacts-view.model"

const ContactsView:React.FC = () => {

    //infrastructure
    const contactsRepository = new ContactsRepositoryImpl()
    //core
    const getContactsUseCase = new GetContactsUseCase(contactsRepository) 
    const createContactUseCase = new CreateContactUseCase(contactsRepository) 
    const updateContactUseCase = new UpdateContactUseCase(contactsRepository) 
    const deleteContactUseCase = new DeleteContactUseCase(contactsRepository) 
    const searchContactsUseCase = new SearchContactsUseCase(contactsRepository) 
    //presentation
    const viewModel = new ContactsViewModel(
        getContactsUseCase, 
        createContactUseCase,
        updateContactUseCase,
        deleteContactUseCase,
        searchContactsUseCase
    )

    return (<ContactsViewComponent viewModel={viewModel}/>)
    
}

export default ContactsView