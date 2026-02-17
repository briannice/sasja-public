import { useEffect, useState } from "react";

type AuthReturnValue = {
    setAuthenticated: (authenticated: boolean) => void;
    isAuthenticated: () => boolean;
};
const useAuthentication = (): AuthReturnValue => {
    const [authState, setAuthState] = useState(false)

    useEffect(() => {
        fetch('/api/auth-status')
            .then(res => res.json())
            .then(data => setAuthState(data.authenticated))
            .catch(() => setAuthState(false))
    }, [])

    const isAuthenticated = (): boolean => {
        return authState
    }

    const setAuthenticated = (authenticated: boolean): void => {
        setAuthState(authenticated)
    }

    return {
        isAuthenticated,
        setAuthenticated,
    };
}
export default useAuthentication
