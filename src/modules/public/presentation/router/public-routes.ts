import LoginView from "../views/login-view";

import { PublicRouteModel } from "./public-route.model";
import { PublicRouteNames } from "./public-route-names";

export const PublicRoutes: PublicRouteModel[] = [
    {
        path: PublicRouteNames.LOGIN, 
        component: LoginView
    }
]