import Image from 'next/image'
import React, { useState } from 'react'
import { RiShieldFill } from 'react-icons/ri'

type Props = {
  size: number
  path?: string
  sasja?: boolean
}

export default function ClubLogo({ size, path = '', sasja = false }: Props) {
  const [url, setUrl] = useState<string | null>(
    path?.startsWith('http') || path?.startsWith('/clubs') ? path : `https://admin.handballbelgium.be/lms_league_ws/public/img/${path}`,
  )

  return (
    <figure className="relative aspect-square" style={{ width: size }}>
      {sasja ? (
        <Image src="/logo.png" alt="Sajsa logo" layout="fill" objectFit="contain" />
      ) : url ? (
        <Image src={url} alt="" layout="fill" objectFit="contain" onError={() => setUrl(null)} />
      ) : (
        <RiShieldFill className="text-medium" style={{ width: size, height: size }} />
      )}
    </figure>
  )
}
