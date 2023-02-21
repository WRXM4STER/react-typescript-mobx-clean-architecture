import { RouteModel } from "core/model/route.model";
import { PublicRouteNames } from "./public-route-names";
import AuthView from "../auth-view";

export const PublicRoutes: RouteModel[] = [
    {
        path: PublicRouteNames.LOGIN, 
        component: AuthView
    }
]