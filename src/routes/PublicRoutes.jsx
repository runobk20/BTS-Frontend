import { Route, Routes } from "react-router-dom";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path='/*' element={<h1>Login</h1>}/>
            <Route path='/signup' element={<h1>Sign up</h1>}/>
        </Routes>
    )
}