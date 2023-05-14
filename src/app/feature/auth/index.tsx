import { Route, Routes } from "react-router-dom"
import { PublicRoutes } from "./router/public-routes"

export const FeatureAuth:React.FC = () => {
    return (
        <Routes>
            {
                PublicRoutes.map((route, index) =>
                    <Route key={index} path={route.path} element={<route.component/>}/>
                )
            }
        </Routes>
    )
}