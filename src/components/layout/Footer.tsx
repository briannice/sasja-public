import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import Link from '@/components/Link'
import { footerLinks } from '@/data/links'
import React from 'react'
import { RiMailFill, RiMapPinFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="bg-light py-16">
      <div className="container flex justify-between">
        <div className="flex space-x-16">
          {footerLinks.map((link) => (
            <div key={link.name} className="flex flex-col items-start">
              <p className="border-b border-primary pb-2 font-kanit">{link.name}</p>
              <ul className="mt-2 space-y-1">
                {link.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href as string} className="text-dark hover:text-black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <div className="mt-8 flex flex-col items-end">
            <p className="border-b border-primary pb-2 font-kanit">Social Media</p>
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="https://www.facebook.com/SasjaHC" target="_blank" rel="noreferrer">
                  <FacebookIcon className="h-4 w-4 text-primary" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sasjahc" target="_blank" rel="noreferrer">
                  <InstagramIcon className="h-4 w-4 text-primary" />
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col items-end">
            <p className="border-b border-primary pb-2 font-kanit">Contact</p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center space-x-4">
                <p className="text-dark">info@sasja-antwerpen.be</p>
                <RiMailFill className="h-5 w-5 text-primary" />
              </li>
              <li className="flex items-center justify-end space-x-4">
                <div className="flex flex-col items-end text-dark">
                  <p>Sporthal Sorghvliedt</p>
                  <p>Krijgsbaan 20</p>
                  <p>2660 Hoboken</p>
                </div>
                <RiMapPinFill className="h-5 w-5 text-primary" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
