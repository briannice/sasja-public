import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { TeamModel } from '@/types/models'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
  team: TeamModel
}

export default function TeamPage({ team }: Props) {
  return (
    <main>
      <h1>{team.name}</h1>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
  const paths = teams.map((team) => ({ params: { team: team.uid } }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  const uid = params.team as string
  const team = collectionToModels<TeamModel>(
    await getDocs(query(collection(db, 'teams'), where('uid', '==', uid)))
  )[0]

  return {
    props: {
      team,
    },
    revalidate: 30 * 60,
  }
}
