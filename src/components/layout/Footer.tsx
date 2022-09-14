import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import Link from '@/components/Link'
import Sponsors from '@/components/Sponsors'
import { footerLinks } from '@/data/links'
import React from 'react'
import { RiMailFill, RiMapPinFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="space-y-32 bg-white pb-16 pt-32">
      <div className="container flex flex-col items-center space-y-16">
        <Sponsors />
      </div>

      <div className="container flex flex-col justify-between space-y-8 laptop:flex-row laptop:space-y-0">
        <div className="grid grid-cols-2 gap-8 tablet:grid-cols-4">
          {footerLinks.map((link) => (
            <div key={link.name} className="inline-flex flex-col items-start">
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

        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-4 laptop:grid-cols-1">
          <div className="flex flex-col items-start laptop:items-end">
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

          <div className="flex flex-col items-start tablet:col-span-3 laptop:col-span-1 laptop:items-end">
            <p className="border-b border-primary pb-2 font-kanit">Contact</p>
            <ul className="mt-4 space-y-4">
              <li className="flex flex-row-reverse items-center laptop:flex-row">
                <p className="text-dark">info@sasja-antwerpen.be</p>
                <RiMailFill className="mr-4 h-5 w-5 text-primary laptop:ml-4 laptop:mr-0" />
              </li>
              <li className="flex flex-row-reverse items-center justify-end laptop:flex-row">
                <div className="flex flex-col items-start text-dark laptop:items-end">
                  <p>Sporthal Sorghvliedt</p>
                  <p>Krijgsbaan 20</p>
                  <p>2660 Hoboken</p>
                </div>
                <RiMapPinFill className="mr-4 h-5 w-5 text-primary laptop:ml-4 laptop:mr-0" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
