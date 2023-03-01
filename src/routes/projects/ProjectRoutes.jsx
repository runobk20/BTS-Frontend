import { Route, Routes } from "react-router-dom";
import { BugView } from "../../components/bugs/BugView";
import { ProjectPage } from "../../pages";

export function ProjectRoutes() {
    return (
        <Routes>
            <Route path=":projectId" element={<ProjectPage/>}/>
            <Route path=":projectId/bug/:bugId" element={<BugView/>}/>
        </Routes>
    )
}