import { Navigate } from "react-router";
import {useAtomValue} from 'jotai';
import { isUserLoggedInAtom } from "../../pages/login/config";

export const RequireAuth = ({children}: {
    children:JSX.Element | null
}) => {
    const isUserLoggedIn = useAtomValue(isUserLoggedInAtom);
    if(true) return <>{children}</>;
    return <Navigate to='/login' />;
}