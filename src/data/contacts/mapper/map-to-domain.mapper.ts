import { Contact } from "domain/contacts"
import { ContactData } from "../model/contact-data.model"

export const mapToDomain = (data:ContactData[]):Contact[] => {
    return data.map(item => ({
        id:item.id,
        name:item.name,
        phone:item.phone,
        is_edit:false
    }))
}