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

function jerseySortKey(val: string): [number, number] {
  const num = parseInt(val, 10);
  if (!isNaN(num)) {
    return [0, num]; // group 0 = numbers
  }
  if (val.startsWith("T")) {
    const tNum = parseInt(val.slice(1), 10);
    return [1, tNum]; // group 1 = "T"-values
  }
  return [2, 0]; // fallback for unexpected values
}

export const getStaticProps: GetStaticProps = async () => {
  const players = await queryToModels<PlayerModel>(
    query(collection(db, 'players'), where('public', '==', true))
  )
  players.sort((a, b) => {
    const [groupA, numA] = jerseySortKey(a.backNumber);
    const [groupB, numB] = jerseySortKey(b.backNumber);
    return groupA - groupB || numA - numB;
  });
  return {
    props: {
      players,
    },
    revalidate: 60 * 10,
  }
}
