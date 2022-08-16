import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./presentation/router/private-routes";

const PrivateModule:React.FC = () => {
    return (
        <Routes>
            {
                PrivateRoutes.map((route, index) =>
                    <Route key={index} path={route.path} element={<route.component/>}/>
                )
            }
        </Routes>
    )
}

export default PrivateModule;