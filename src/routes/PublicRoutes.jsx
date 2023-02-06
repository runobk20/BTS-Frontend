import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layout";
import { LoginPage, SignUpPage } from "../pages/auth";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path='/' element={<AuthLayout/>}>
                <Route index element={<LoginPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path="/*" element={<Navigate to={'/'}/>}/>
            </Route>
        </Routes>
    )
}