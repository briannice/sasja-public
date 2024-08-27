import useStorage from '@/utils/storage'

type AuthReturnValue = {
    setAuthenticated: (authenticated: boolean) => void
    isAuthenticated: () => boolean
}
const useAuthentication = (): AuthReturnValue => {
    const AUTHENTICATED = 'authenticated'
    const VALID_VALUE = 'true'
    const { setItem, getItem, removeItem } = useStorage()

    const isAuthenticated = (): boolean => {
        return getItem(AUTHENTICATED) == VALID_VALUE
    }

    const setAuthenticated = (authenticated: boolean): void => {
        if (authenticated) setItem(AUTHENTICATED, VALID_VALUE)
        else removeItem(AUTHENTICATED)
    }

    return {
        isAuthenticated,
        setAuthenticated,
    }
}
export default useAuthentication
