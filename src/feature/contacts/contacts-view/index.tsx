import { ContactsRepositoryImpl } from "data/contacts"
import { 
    CreateContactUseCase, 
    DeleteContactUseCase, 
    UpdateContactUseCase, 
    GetContactsUseCase,
    SearchContactsUseCase 
} from "domain/contacts"
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