import { RouteModel } from "app/core/model";
import { PrivateRouteNames } from "./private-route-names";
import ContactsView from "../contacts-view";

export const PrivateRoutes: RouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]