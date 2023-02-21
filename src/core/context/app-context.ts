import AuthEntity from "data/auth/service/auth.service";
import { createContext } from "react";

interface IAppContext {
    authEntity:null | AuthEntity
}

export const AppContext = createContext<IAppContext>({
    authEntity:null
})