import Container from '@/components/Container'
import React from 'react'

const tickets = [
  {
    key: 'Volwassenen',
    price: '€ 10',
  },
  {
    key: 'Beloften',
    price: '€ 5',
  },
  {
    key: 'Studenten (op vertoon van studentenkaart)',
    price: '€ 5',
  },
  {
    key: 'Senioren + 70 jaar',
    price: '€ 5',
  },
  {
    key: 'Combiticket (Eerste ploeg en Beloften) ',
    price: '€ 12',
  },
  {
    key: 'Op vertoon van lidkaart SASJA of Fankaart',
    price: 'gratis',
  },
  {
    key: 'Op vertoon van abonnement GS Hoboken Ster',
    price: 'gratis',
  },
  {
    key: 'Op vertoon van lidkaart Beerschot tot 16 jaar',
    price: 'gratis',
  },
]

export default function TicketsAndAbos() {
  return (
    <Container className="grid grid-cols-2 gap-8">
      <h2 className="sr-only">Tickets en abonnementen</h2>
      <section className="card px-8 py-16">
        <h3 className="text-center text-5xl">Tickets</h3>
        <ul className="mt-8 divide-y divide-light">
          {tickets.map((ticket, i) => (
            <li key={i}>
              <div className="flex py-4">
                <p className="flex-1 text-dark">{ticket.key}</p>
                <p className="w-20 text-right font-kanit">{ticket.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="card px-8 py-16">
        <h3 className="text-center text-5xl">Abonnementen</h3>
        <p className="mt-8 text-center font-kanit text-2xl">Heren en Beloften</p>
        <p className="mt-5 leading-relaxed text-dark">
          Alle wedstrijden van zowel de Heren als Beloften en Play offs, uitgezonderd de
          bekerwedstrijden
        </p>
        <p className="mt-5 text-center font-kanit text-2xl">€100</p>
        <p className="mt-5 leading-relaxed text-dark">
          Abonnementen kan u bekomen door op rekeningnummer BE36 3631 9217 0881 het juiste bedrag
          over te maken en in de mededeling uw naam te vermelden.
        </p>
      </section>
    </Container>
  )
}
