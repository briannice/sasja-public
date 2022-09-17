import Container from '@/components/Container'
import React from 'react'

// Maandag
// JM14 (2dejaars)-JM16 17u30-19u sporthal Sorgvliedt
// JM12-JM14 (1stejaars) 18u-19u30 sporthal Notelaar

// Dinsdag
// JM16 18u-19u30 Sporthal Notelaar

// Woensdag
// JM8 13u30-14u45 Sporthal Notelaar
// JM10 14u30-16u Sporthal Notelaar
// JM12 14u30-16u Sporthal Sorgvliedt
// JM14 16u-18u Sporthal Sorghvliedt

// Donderdag
// JM12 17u15-19u Sporthal Kiel
// JM14-JM16(1stejaars) 17u30-19u Sporthal Fort VIII
// JM16(2dejaars)-Liga 1 (-18j) 18u-19u30 Sporthal Sorghvliedt

const trainings = [
  {
    day: 'Maandag',
    data: [
      {
        team: 'JM14 (2e)',
        start: '17u30',
        end: '19u00',
        location: 'Sporthal Sorghvliedt',
      },
      {
        team: 'JM12',
        start: '17u30',
        end: '19u00',
        location: 'Sporthal Sorghvliedt',
      },
    ],
  },
  {
    day: 'Dinsdag',
    data: [
      {
        team: 'JM16',
        start: '17u30',
        end: '19u00',
        location: 'Sporthal Sorghvliedt',
      },
      {
        team: 'JM12',
        start: '17u30',
        end: '19u00',
        location: 'Sporthal Sorghvliedt',
      },
    ],
  },
]

export default function TrainingsPage() {
  return (
    <main>
      <h1 className="title1 mt-8">Trainingen</h1>
      <Container card={true} className="space-y-4 p-8">
        {trainings.map(({ data, day }) => (
          <section key={day}>
            <h2 className="inline-block border-b border-primary pb-2 text-xl">{day}</h2>
            <table className="mt-2 table-fixed shadow-none">
              <tbody>
                {data.map((t, i) => (
                  <tr key={i}>
                    <td className="pl-0">
                      <p className="font-bold">{t.team}</p>
                    </td>
                    <td>
                      <p className="text-dark">{`${t.start} tot ${t.end}`}</p>
                    </td>
                    <td className="text-dark">
                      <p>{t.location}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </Container>
    </main>
  )
}
