import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../layout";
import { DashboardPage } from "../pages";
import { ProjectRoutes } from "./projects/ProjectRoutes";

export function PrivateRoutes() {

    const {pathname} = useLocation();
    localStorage.setItem('lastPath', pathname);

    return (
        <Routes>
            <Route path='/' element={<AppLayout/>}>
                <Route index element={<DashboardPage/>}/>
                <Route path="projects/*" element={<ProjectRoutes/>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    )
}