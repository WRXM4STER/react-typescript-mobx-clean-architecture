import ContactsView from "../views/contacts-view";
import { PrivateRouteNames } from "./private-route-names";
import { PrivateRouteModel } from "./private-route.model";

export const PrivateRoutes: PrivateRouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]