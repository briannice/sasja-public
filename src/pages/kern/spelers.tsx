import PlayerCard from '@/components/cards/PlayerCard'
import Container from '@/components/Container'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { PlayerModel } from '@/types/models'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = {
  players: PlayerModel[]
}

export default function Players({ players }: Props) {
  return (
    <>
      <Head>
        <title>Sasja HC | Spelers</title>
      </Head>
      <main>
        <h1 className="title1 mt-8">Spelers</h1>
        <Container className="mt-8 grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </Container>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const players = await queryToModels<PlayerModel>(
    query(collection(db, 'players'), where('public', '==', true), orderBy('backNumber', 'asc'))
  )
  return {
    props: {
      players,
    },
    revalidate: 60 * 10,
  }
}
