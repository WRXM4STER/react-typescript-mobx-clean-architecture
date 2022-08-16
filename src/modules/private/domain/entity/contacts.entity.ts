import { makeAutoObservable } from "mobx"
import { Contact } from "../models/contact.model"

class ContactsEntity {

    private contacts:Contact[] = []

    constructor() {
        makeAutoObservable(this)
    }

    set(contacts:Contact[]) {
        this.contacts = contacts
    }

    create(contact:Contact) {
        this.contacts.push(contact)
    }

    get() {
        return this.contacts
    }

    update(index:number) {
        this.contacts[index].is_edit=false
    }

    delete(id:number) {
        let index = this.contacts.findIndex(item => item.id === id);
        if (index >= 0) this.contacts.splice(index, 1);
    }

    onNameChanged(index:number, value:string) {
        this.contacts[index].name = value
        this.contacts[index].is_edit = true
    }

    onPhoneChanged(index:number, value:string) {
        this.contacts[index].phone = value
        this.contacts[index].is_edit = true
    }

}

const contactsEntity = new ContactsEntity()
export default contactsEntity