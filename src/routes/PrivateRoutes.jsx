import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout";
import { DashboardPage } from "../pages";
import { ProjectRoutes } from "./projects/ProjectRoutes";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route path='/' element={<AppLayout/>}>
                <Route index element={<DashboardPage/>}/>
                <Route path="/projects/*" element={<ProjectRoutes/>}/>
                <Route path='myProfile' element={<h1>MyProfile</h1>}/>
                <Route path='notifications' element={<h1>MyNotifications</h1>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    )
}