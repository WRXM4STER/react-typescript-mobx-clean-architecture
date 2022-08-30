import { AuthUseCase } from "../../../core/interactors/auth.use-case"
import { AuthRepositoryImpl } from "../../../infrastructure/repository/auth.repository.impl"
import AuthViewComponent from "./auth-view.component"
import { AuthViewModel } from "./auth-view.model"

const AuthView:React.FC = () => {

    //data
    const authRepository = new AuthRepositoryImpl()
    //domain
    const authUseCase = new AuthUseCase(authRepository) 
    //presentation
    const authViewModel = new AuthViewModel(authUseCase)

    return (<AuthViewComponent viewModel={authViewModel}/>)
    
}

export default AuthView