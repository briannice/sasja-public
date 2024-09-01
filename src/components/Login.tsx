import React, { AnchorHTMLAttributes, FormEventHandler, useState } from 'react'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { RiLoginBoxLine } from 'react-icons/ri'

import Popup from '@/components/Popup'

import useAuthentication from '@/utils/auth'

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
    <button
      onClick={() => (isAuthenticated() ? logout() : setShowLogin(true))}
      className={className}
    >
      {isAuthenticated() ? (
        <span className="font-kanit text-dark">
          <AiFillLock />
        </span>
      ) : (
        <span className="font-kanit text-dark">
          <AiFillUnlock />
        </span>
      )}

      {/* <span className="absolute inset-x-8 mt-6 block h-0.5 origin-left scale-x-0 transform bg-primary transition group-hover:scale-x-100" /> */}

      <Popup open={showLogin} onClose={() => setShowLogin(false)}>
        <span className="font-kanit text-lg">Login Tafelofficials</span>
        <form onSubmit={submitHandler} className="">
          <div className="mt-4">
            <label htmlFor="password">Wachtwoord</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="mt-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-text-icon mt-8">
            <span>Aanmelden</span>
            <RiLoginBoxLine />
          </button>
          {error && <p className="mt-4 text-center text-sm text-error">{error}</p>}
        </form>
      </Popup>
      <Popup open={showLogout} onClose={() => setShowLogout(false)}>
        <p>Bedankt en tot ziens!</p>
      </Popup>
    </button>
  )
}
