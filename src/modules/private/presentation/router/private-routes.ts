import { PrivateRouteNames } from "./private-route-names";
import { PrivateRouteModel } from "./private-route.model";
import ContactsView from "../views/contacts-view";

export const PrivateRoutes: PrivateRouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]