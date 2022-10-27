import { Route, Routes } from "react-router-dom"
import { PublicRoutes } from "./presentation/router/public-routes"

const FeatureAuth:React.FC = () => {
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

export default FeatureAuth