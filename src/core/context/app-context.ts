import { AuthService } from "core";
import { createContext } from "react";

interface IAppContext {
    authService:null | AuthService
}

export const AppContext = createContext<IAppContext>({
    authService:null
})