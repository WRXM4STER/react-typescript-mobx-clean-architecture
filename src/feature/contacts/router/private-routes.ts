import { RouteModel } from "core";
import { PrivateRouteNames } from "./private-route-names";
import ContactsView from "../contacts-view";

export const PrivateRoutes: RouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]