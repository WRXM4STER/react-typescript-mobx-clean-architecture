import AuthEntity from "core/domain/entities/auth.entity";
import { createContext } from "react";

interface IAppContext {
    authEntity:null | AuthEntity
}

export const AppContext = createContext<IAppContext>({
    authEntity:null
})