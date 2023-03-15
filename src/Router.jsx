import { useEffect } from "react";
import { useAuthStore } from "./hooks";
import { PublicRoutes, PrivateRoutes } from "./routes";
import { Loader } from "./components";

export function Router() {

    const { checkAuthToken, isLogged } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[]);

    if(isLogged === 'checking') return <Loader/>

    return (
        <>
            {
                (isLogged === 'authenticated')
                    ? (
                        <>
                            <PrivateRoutes/>
                        </>
                      )
                    : (
                        <>
                            <PublicRoutes/>
                        </>  
                      )
            }
        </>
    )

}