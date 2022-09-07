import HeadlessLink from '@/components/HeadlessLink'
import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import Link from '@/components/Link'
import { headerLinks } from '@/data/links'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 bg-white shadow-sm laptop:h-24">
      <nav className="container flex h-full items-center">
        <Link href="/" className="relative block aspect-square h-3/4">
          <Image src="/logo.png" alt="Logo Sasja HC" layout="fill" objectFit="contain" />
        </Link>
        <ul className="ml-auto flex h-full">
          {headerLinks.map((link) => (
            <li key={link.name} className="group relative h-full">
              {link.href ? (
                <Link href={link.href} className="relative flex h-full items-center px-8">
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
                              open ? 'rotate-[360deg]' : 'group-hover:rotate-180'
                            )}
                          />
                        </Menu.Button>
                        <Menu.Items className="absolute right-8 z-50 -mt-2 flex flex-col rounded-lg border border-light bg-white shadow-lg">
                          {link.sublinks.map((sublink) => (
                            <Menu.Item key={sublink.name}>
                              {({ active }) => (
                                <HeadlessLink
                                  href={sublink.href}
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
        </ul>
        <div className="ml-8 flex flex-col justify-center space-y-2">
          <a href="https://www.facebook.com/SasjaHC" target="_blank" rel="noreferrer">
            <FacebookIcon className="h-4 w-4 text-primary" />
          </a>
          <a href="https://www.instagram.com/sasjahc" target="_blank" rel="noreferrer">
            <InstagramIcon className="h-4 w-4 text-primary" />
          </a>
        </div>
      </nav>
    </header>
  )
}
