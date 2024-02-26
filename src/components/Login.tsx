import React, { AnchorHTMLAttributes, FormEventHandler, Fragment, useState } from 'react'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Dialog, Transition } from '@headlessui/react'
import useAuthentication from '@/utils/auth'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string | undefined
}

export default function Login({ className }: Props) {
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuthenticated, isAuthenticated } = useAuthentication()

  const login = async (password: string) => {
    if (password === 'Sasja1958') {
      setAuthenticated(true)
      setShowLogin(false)
    } else {
      throw { message: 'Ongeldig wachtwoord' }
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
        onClick={() => (isAuthenticated() ? logout() : setShowLogin(true))}
        className={className}
      >
        <span className="font-kanit text-dark">
          {isAuthenticated() ? <AiFillLock /> : <AiFillUnlock />}
        </span>
        <span className="absolute inset-x-8 mt-6 block h-0.5 origin-left scale-x-0 transform bg-primary transition group-hover:scale-x-100" />
      </button>

      <Transition
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showLogin}
        as={Fragment}
      >
        <Dialog
          onClose={setShowLogin}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
          <div className="scrollbar-hidden no-scrollbar">
            <div className="relative rounded-lg bg-white p-8 shadow">
              <span className="font-kanit text-xl">Login Tafelofficials</span>
              <form onSubmit={submitHandler} className="border-primary">
                <label htmlFor="password" className="mt-8">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-text-icon mt-4 w-full">
                  <span>Aanmelden</span>
                  <RiLoginBoxLine />
                </button>
                {error && <p className="mt-4 text-center text-sm text-error">{error}</p>}
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showLogout}
        as={Fragment}
      >
        <Dialog
          onClose={setShowLogout}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
          <div className="scrollbar-hidden no-scrollbar">
            <div className="relative rounded-lg bg-white p-4 shadow">
              <p>Bedankt en tot ziens!</p>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
