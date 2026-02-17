import { useEffect, useState } from "react";
import useStorage from "@/utils/storage";

const AUTHENTICATED = "authenticated"
const VALID_VALUE = "true"

type AuthReturnValue = {
    setAuthenticated: (authenticated: boolean) => void;
    isAuthenticated: () => boolean;
};
const useAuthentication = (): AuthReturnValue => {
    const { setItem, removeItem } = useStorage();
    const [authState, setAuthState] = useState(false)

    useEffect(() => {
        setAuthState(window.sessionStorage.getItem(AUTHENTICATED) === VALID_VALUE)
    }, [])

    const isAuthenticated = (): boolean => {
        return authState
    }

    const setAuthenticated = (authenticated: boolean): void => {
        if (authenticated)
            setItem(AUTHENTICATED, VALID_VALUE)
        else
            removeItem(AUTHENTICATED)
        setAuthState(authenticated)
    }

    return {
        isAuthenticated,
        setAuthenticated,
    };
}
export default useAuthentication
