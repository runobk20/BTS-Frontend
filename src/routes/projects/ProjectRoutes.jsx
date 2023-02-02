import { Navigate, Route, Routes } from "react-router-dom";
import { ProjectPage } from "../../pages";

export function ProjectRoutes() {
    return (
        <Routes>
            <Route path="/:projectId" element={<ProjectPage/>}/>
        </Routes>
    )
}