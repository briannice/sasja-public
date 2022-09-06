import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
  path: string
  size: number
}

export default function ClubLogo({ path, size }: Props) {
  const [url, setUrl] = useState<string | null>(
    `https://admin.handballbelgium.be/lms_league_ws/public/img/${path}`
  )
  return (
    <figure className="relative aspect-square" style={{ width: size }}>
      {url && (
        <Image
          src={url}
          alt="Club logo"
          layout="fill"
          objectFit="contain"
          onError={() => setUrl(null)}
        />
      )}
    </figure>
  )
}
