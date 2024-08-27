import Popup from '@/components/Popup'
import useImage from '@/hooks/useImage'
import { PlayerModel } from '@/types/models'
import Image from "next/legacy/image"
import React, { Fragment, useState } from 'react'

type Props = {
  player: PlayerModel
}

export default function PlayerCard({ player }: Props) {
  const [showInfo, setShowInfo] = useState(false)

  const image = useImage('players', player.id, 'sm')
  const name = player.lastname.concat(' ', player.firstname)
  const properties = [
    { key: 'Voornaam', value: player.firstname },
    { key: 'Achternaam', value: player.lastname },
    { key: 'Rugnummer', value: player.backNumber },
    // { key: 'Team', value: player.team.name },
    // { key: 'Geboortedatum', value: formatDate(player.birthday, 'DD/MM/YYYY') },
    // { key: 'Aansluitingsdatum', value: formatDate(player.registration, 'DD/MM/YYYY') },
  ]

  return (
    <section className="card card-click col-span-4" onClick={() => setShowInfo(true)}>
      <figure className="relative aspect-[1940/1282]">
        {image && <Image src={image} alt="Player image" layout="fill" objectFit="cover" />}
      </figure>
      <h3 className="p-4 text-center text-lg">{name}</h3>

      <Popup open={showInfo} onClose={setShowInfo}>
        <h3 className="text-4xl font-black">{name}</h3>
        <dl className="mt-8 inline-grid grid-cols-2 gap-y-2 gap-x-8 border-l-2 border-primary pl-4">
          {properties.map((p, i) => (
            <Fragment key={i}>
              <dd>{p.key}</dd>
              <dt>{p.value}</dt>
            </Fragment>
          ))}
        </dl>
        <figure className="relative mx-auto mt-8 aspect-[1940/1282] max-w-sm">
          {image && <Image src={image} alt="Player image" layout="fill" objectFit="cover" />}
        </figure>
        <div className="cms-content" dangerouslySetInnerHTML={{ __html: player.description }} />
      </Popup>
    </section>
  )
}
