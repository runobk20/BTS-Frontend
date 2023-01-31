import { Navigate, Route, Routes } from "react-router-dom";

export function ProjectRoutes() {
    return (
        <Routes>
            <Route index element={<h1>hi</h1>}/>
            <Route path="/:id" element={<h1>Project Data</h1>}/>
            <Route path="/:id" element={<h1>Project Data</h1>}/>
            <Route path="/:id" element={<h1>Project Data</h1>}/>
            <Route path="/:id" element={<h1>Project Data</h1>}/>
        </Routes>
    )
}