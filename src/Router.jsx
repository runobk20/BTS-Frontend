import { useEffect } from "react";
import { useAuthStore } from "./hooks";
import { PublicRoutes, PrivateRoutes } from "./routes";
import { Loader } from "./components";

export function Router() {

    const { checkAuthToken, isLogged } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[]);

    useEffect(() => {
        if(isLogged === 'checking') <Loader/>
    }, [isLogged]);
    

    return (
        <>
            {
                (isLogged === 'authenticated')
                    ? <PrivateRoutes/>
                    : <PublicRoutes/>
            }
        </>
    )

}