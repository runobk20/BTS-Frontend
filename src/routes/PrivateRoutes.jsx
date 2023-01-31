import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route path='/' element={<AppLayout/>}>
                <Route index element={<h1>Dashboard</h1>}/>
                <Route path="/projects" element={<h1>Projects</h1>}/>
                <Route path='myProfile' element={<h1>MyProfile</h1>}/>
                <Route path='notifications' element={<h1>MyNotifications</h1>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    )
}