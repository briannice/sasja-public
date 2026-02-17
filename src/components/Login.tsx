import React, {AnchorHTMLAttributes, FormEventHandler, useState} from "react";
import {RiLoginBoxLine} from "react-icons/ri";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import useAuthentication from "@/utils/auth";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string | undefined
}

export default function Login({ className }: Props) {
    const [showLogin, setShowLogin] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {setAuthenticated, isAuthenticated} = useAuthentication()

    const login = async (password: string) => {
        if (password === "Sasja1958") {
            setAuthenticated(true)
            setShowLogin(false)
        } else {
            throw {"message": "Ongeldig wachtwoord"}
        }
    }

    const logout = async () => {
        setAuthenticated(false)
        setShowLogout(true)
    }


    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        login(password)
            .then(() => setError(''))
            .catch((err: any) => {
                setError(err.message)
            })
    }
    return (
      <>
        <button
            onClick={() => isAuthenticated() ? logout(): setShowLogin(true)}
            className={className}
        >
            {isAuthenticated() ?
                <span className="font-kanit text-dark"><AiFillUnlock/></span>
                :
                <span className="font-kanit text-dark"><AiFillLock/></span>
            }
            <span className="absolute inset-x-8 mt-6 block h-0.5 origin-left scale-x-0 transform bg-primary transition group-hover:scale-x-100" />
        </button>
        <Dialog open={showLogin} onClose={setShowLogin} className="fixed inset-0 z-50 flex items-center justify-center">
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />
            <DialogPanel className="relative rounded-lg bg-white p-4 shadow">
                <span className="font-kanit text-lg">Login Tafelofficials</span>
                <form onSubmit={submitHandler} className="border-primary">
                    <div className="mt-4">
                        <label htmlFor="password">wachtwoord:</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          className="m-2"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-text-icon mt-8">
                        <span>Aanmelden</span>
                        <RiLoginBoxLine />
                    </button>
                    {error && <p className="mt-4 text-center text-sm text-error">{error}</p>}
                </form>
            </DialogPanel>
        </Dialog>
        <Dialog open={showLogout} onClose={setShowLogout} className="fixed inset-0 z-50 flex items-center justify-center">
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />
            <DialogPanel className="relative rounded-lg bg-white p-4 shadow">
                <p>Bedankt en tot ziens!</p>
            </DialogPanel>
        </Dialog>
      </>
    )
}
