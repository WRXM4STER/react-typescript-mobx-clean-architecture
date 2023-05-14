import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./router/private-routes";

export const FeatureContacts:React.FC = () => {
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