import { PrivateRouteNames } from "./private-route-names";
import ContactsView from "../views/contacts-view";
import { RouteModel } from "../../../core/domain/models/route.model";

export const PrivateRoutes: RouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]