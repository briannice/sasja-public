import Link from '@/components/Link'
import { footerLinks } from '@/data/links'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-light py-16">
      <div className="container">
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
      </div>
    </footer>
  )
}
