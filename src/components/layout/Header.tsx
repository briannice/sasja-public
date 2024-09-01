import Image from 'next/legacy/image'

import React, { Fragment, useState } from 'react'
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from 'react-icons/ri'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import HeadlessLink from '@/components/HeadlessLink'
import Link from '@/components/Link'
import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import TiktokIcon from '@/components/icons/TiktokIcon'

import { headerLinks } from '@/data/links'

import { cn } from '@/utils/utils'

export default function Header() {
  const [isOpens, setIsOpens] = useState(headerLinks.map(() => false))

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 bg-white shadow-sm laptop:h-24">
      <nav className="container flex h-full items-center">
        <Link href="/" className="relative block aspect-square h-3/4">
          <Image src="/logo.png" alt="Logo Sasja HC" layout="fill" objectFit="contain" />
        </Link>
        <ul className="ml-auto hidden h-full desktop:flex">
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
                        <MenuButton className="flex h-full items-center space-x-3 px-8">
                          <span className="font-kanit text-dark">{link.name}</span>
                          <RiArrowDownSLine
                            className={cn(
                              'mt-0.5 h-5 w-5 text-primary transition',
                              open ? 'rotate-180' : 'group-hover:rotate-180'
                            )}
                          />
                        </MenuButton>
                        <MenuItems
                          anchor="bottom end"
                          className="z-50 -mt-2 flex origin-top-right flex-col rounded-lg border border-light bg-white shadow-lg transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                          transition
                        >
                          {link.sublinks.map((sublink) => (
                            <MenuItem key={sublink.name}>
                              <HeadlessLink
                                href={sublink.href}
                                blank={sublink.blank}
                                className="block whitespace-nowrap px-8 py-2 text-right font-kanit text-dark data-[focus]:bg-light"
                              >
                                {sublink.name}
                              </HeadlessLink>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </>
                    )}
                  </Menu>
                )
              )}
            </li>
          ))}
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
        </ul>

        <Menu as="div" className="ml-auto block desktop:hidden">
          {({ open }) => (
            <>
              <MenuButton className="ml-auto">
                {open ? <RiCloseLine className="h-8 w-8" /> : <RiMenuLine className="h-8 w-8" />}
              </MenuButton>

              <MenuItems className="container fixed bottom-0 right-0 top-20 z-50 overflow-y-scroll bg-white px-8 shadow tablet:w-80">
                <ul className="divide-y divide-light py-8">
                  {headerLinks.map((link, i) => (
                    <li key={link.name}>
                      {link.href ? (
                        <MenuItem>
                          <HeadlessLink
                            href={link.href}
                            blank={link.blank}
                            className="block py-3 font-kanit"
                          >
                            {link.name}
                          </HeadlessLink>
                        </MenuItem>
                      ) : (
                        link.sublinks && (
                          <div>
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
                                className={cn(
                                  'mt-0.5 h-5 w-5 text-primary transition',
                                  isOpens[i] ? 'rotate-180' : 'rotate-0'
                                )}
                              />
                            </button>

                            <ul className="mb-3 flex flex-col border-l border-primary pl-3">
                              {link.sublinks.map((sublink) => (
                                <li key={sublink.name}>
                                  <MenuItem>
                                    <HeadlessLink
                                      href={sublink.href}
                                      blank={sublink.blank}
                                      className="block py-3 font-kanit text-dark"
                                    >
                                      {sublink.name}
                                    </HeadlessLink>
                                  </MenuItem>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </li>
                  ))}
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
              </MenuItems>
            </>
          )}
        </Menu>
      </nav>
    </header>
  )
}
