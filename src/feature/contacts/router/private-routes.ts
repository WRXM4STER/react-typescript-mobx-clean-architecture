import { PrivateRouteNames } from "./private-route-names";
import ContactsView from "../contacts-view";
import { RouteModel } from "core";

export const PrivateRoutes: RouteModel[] = [
    {
        path: PrivateRouteNames.CONTACTS, 
        component: ContactsView
    }
]