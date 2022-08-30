import { PublicRouteModel } from "./public-route.model";
import { PublicRouteNames } from "./public-route-names";
import AuthView from "../views/auth-view";

export const PublicRoutes: PublicRouteModel[] = [
    {
        path: PublicRouteNames.LOGIN, 
        component: AuthView
    }
]