import MatchReportOverview from '@/components/MatchReportOverview'
import NewsOverview from '@/components/NewsOverview'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { MatchReportModel, NewsModel } from '@/types/models'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = {
    initialNews: NewsModel[]
    initialMatchReports: MatchReportModel[]
}

export default function index({ initialNews, initialMatchReports }: Props) {
    return (
        <>
            <Head>
                <title>Sasja HC | News</title>
            </Head>
            <main>
                <h1 className="sr-only">Nieuws en matchverslagen</h1>
                <NewsOverview initialNews={initialNews} />
                <MatchReportOverview initialMatchReports={initialMatchReports} />
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const initialNews = await queryToModels<NewsModel>(
        query(
            collection(db, 'news'),
            where('public', '==', true),
            orderBy('time', 'desc'),
            limit(10)
        )
    )

    const initialMatchReports = await queryToModels<MatchReportModel>(
        query(
            collection(db, 'matchreport'),
            where('public', '==', true),
            orderBy('time', 'desc'),
            limit(10)
        )
    )

    return {
        props: {
            initialNews,
            initialMatchReports,
        },
        revalidate: 5 * 60,
    }
}
