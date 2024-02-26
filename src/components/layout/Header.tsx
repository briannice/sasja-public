import HeadlessLink from '@/components/HeadlessLink'
import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import Link from '@/components/Link'
import { headerLinks } from '@/data/links'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from 'react-icons/ri'
import TiktokIcon from '@/components/icons/TiktokIcon'
import Login from '@/components/Login'

export default function Header() {
  const [isOpens, setIsOpens] = useState(headerLinks.map(() => false))

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 bg-white shadow-sm laptop:h-24">
      <nav className="container flex h-full items-center">
        <Link href="/" className="relative block aspect-square h-3/4">
          <Image src="/logo.png" alt="Logo Sasja HC" layout="fill" objectFit="contain" />
        </Link>
        <ul className="ml-auto hidden h-full laptop:flex">
          {headerLinks.map((link) => (
            <li key={link.name} className="group relative h-full">
              {link.href ? (
                <Link
                  href={link.href}
                  blank={link.blank}
                  className="relative flex h-full items-center px-8"
                >
                  <span className="font-kanit text-dark">{link.name}</span>
                  <span className="absolute inset-x-8 mt-6 block h-0.5 origin-left scale-x-0 transform bg-primary transition group-hover:scale-x-100" />
                </Link>
              ) : (
                link.sublinks && (
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="flex h-full items-center space-x-3 px-8">
                          <span className="font-kanit text-dark">{link.name}</span>
                          <RiArrowDownSLine
                            className={clsx(
                              'mt-0.5 h-5 w-5 text-primary transition',
                              open ? 'rotate-180' : 'group-hover:rotate-180'
                            )}
                          />
                        </Menu.Button>
                        <Menu.Items className="absolute right-8 z-50 -mt-2 flex flex-col rounded-lg border border-light bg-white shadow-lg">
                          {link.sublinks.map((sublink) => (
                            <Menu.Item key={sublink.name}>
                              {({ active }) => (
                                <HeadlessLink
                                  href={sublink.href}
                                  blank={sublink.blank}
                                  className={clsx(
                                    'whitespace-nowrap py-2 px-8 text-right font-kanit text-dark',
                                    active && 'bg-light'
                                  )}
                                >
                                  {sublink.name}
                                </HeadlessLink>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </>
                    )}
                  </Menu>
                )
              )}
            </li>
          ))}
          <li className="group relative h-full">
            <Login className="relative flex h-full items-center px-8" />
          </li>
        </ul>
        <div className="ml-8 hidden flex-col justify-center space-y-2 laptop:flex">
          <a href="https://www.facebook.com/SasjaHC" target="_blank" rel="noreferrer">
            <FacebookIcon className="h-4 w-4 text-primary" />
          </a>
          <a href="https://www.instagram.com/sasjahc" target="_blank" rel="noreferrer">
            <InstagramIcon className="h-4 w-4 text-primary" />
          </a>
          <a href="https://www.tiktok.com/@sasja.hc" target="_blank" rel="noreferrer">
            <TiktokIcon className="h-4 w-4 text-primary" />
          </a>
        </div>

        <Menu as="div" className="ml-auto block laptop:hidden">
          {({ open }) => (
            <>
              <Menu.Button className="ml-auto">
                {open ? <RiCloseLine className="h-8 w-8" /> : <RiMenuLine className="h-8 w-8" />}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Menu.Items
                  as="div"
                  className="container fixed top-20 bottom-0 right-0 z-50 overflow-y-scroll bg-white px-8 shadow tablet:w-80"
                >
                  <ul className="divide-y divide-light py-8">
                    {headerLinks.map((link, i) => (
                      <li key={link.name}>
                        {link.href ? (
                          <Menu.Item>
                            <HeadlessLink
                              href={link.href}
                              blank={link.blank}
                              className="block py-3 font-kanit"
                            >
                              {link.name}
                            </HeadlessLink>
                          </Menu.Item>
                        ) : (
                          link.sublinks && (
                            <>
                              <button
                                onClick={() => {
                                  const isOpensCopy = [...isOpens]
                                  isOpensCopy[i] = !isOpensCopy[i]
                                  setIsOpens(isOpensCopy)
                                }}
                                className="flex w-full items-center justify-between py-3"
                              >
                                <span className="font-kanit">{link.name}</span>
                                <RiArrowDownSLine
                                  className={clsx(
                                    'mt-0.5 h-5 w-5 text-primary transition',
                                    isOpens[i] ? 'rotate-180' : 'rotate-0'
                                  )}
                                />
                              </button>
                              <Transition
                                as={Fragment}
                                show={isOpens[i]}
                                enter="transition ease-out duration-100 origin-top"
                                enterFrom="scale-y-0"
                                enterTo="scale-y-100"
                                leave="transition ease-in duration-75 origin-top"
                                leaveFrom="scale-y-100"
                                leaveTo="scale-y-0"
                              >
                                <ul className="mb-3 flex flex-col border-l border-primary pl-3">
                                  {link.sublinks.map((sublink) => (
                                    <li key={sublink.name}>
                                      <Menu.Item>
                                        <HeadlessLink
                                          href={sublink.href}
                                          blank={sublink.blank}
                                          className="block py-3 font-kanit text-dark"
                                        >
                                          {sublink.name}
                                        </HeadlessLink>
                                      </Menu.Item>
                                    </li>
                                  ))}
                                </ul>
                              </Transition>
                            </>
                          )
                        )}
                      </li>
                    ))}
                    <li className="block py-3 font-kanit">
                      <Login></Login>
                    </li>
                    <li className="flex space-x-4 pt-5">
                      <a href="https://www.facebook.com/SasjaHC" target="_blank" rel="noreferrer">
                        <FacebookIcon className="h-5 w-5 text-primary" />
                      </a>
                      <a href="https://www.instagram.com/sasjahc" target="_blank" rel="noreferrer">
                        <InstagramIcon className="h-5 w-5 text-primary" />
                      </a>
                      <a href="https://www.tiktok.com/@sasja.hc" target="_blank" rel="noreferrer">
                        <TiktokIcon className="h-5 w-5 text-primary" />
                      </a>
                    </li>
                  </ul>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </nav>
    </header>
  )
}
