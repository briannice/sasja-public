import StaffOverview from '@/components/StaffOverview'
import React from 'react'

const topStaff = [
  {
    name: 'Nick Jansen',
    function: 'Voorzitter',
    email: 'nick.jansen@telenet.be',
  },
  {
    name: 'Rita Van der Auwera',
    function: 'Secretaris',
    email: 'secretariaat@sasja-antwerpen.be',
  },
  {
    name: 'Tom Ocket',
    function: 'Penningmeester',
    email: 'ockettom@hotmail.com',
  },
]

const board = [
  {
    name: 'Carl Bakx',
    function: 'Bestuurslid',
    email: ''
  },
  {
    name: 'Dirk Faes',
    function: 'Bestuurslid',
    email: ''
  },
  {
    name: 'Michael Leeman',
    function: 'Bestuurslid',
    email: ''
  },
  {
    name: 'Alex Jacobs',
    function: 'Bestuurslid',
    email: ''
  },
]

const api = [
  {
    name: 'Kenny Claes',
    function: 'API',
    email: 'api@sasja-antwerpen.be'
  }
]

const youth = [
  {
    name: 'Michael Leeman',
    function: 'Jeugdvoorzitter',
    email: 'jeugd@sasja-antwerpen.be'
  },
  {
    name: 'Inge Servaes',
    function: 'Kalenderverantwoordelijke',
    email: 'jeugd@sasja-antwerpen.be'
  },
  {
    name: 'Kenny Claes',
    function: 'Bestuurslid',
    email: 'jeugd@sasja-antwerpen.be'
  },
]

const other = [
  {
    name: 'Inge Servaes',
    function: 'Promotieverantwoordelijke',
    email: 'inge.servaes@sasja-antwerpen.be',
  },
  {
    name: 'Michael Leeman',
    function: 'Administratief Coördinator',
    email: 'michael.leeman@sasja-antwerpen.be',
    phone: '0499157422',
  },
  {
    name: 'Carrie Claes',
    function: 'Vrijwilligerscoördinator',
    email: 'carrie.claes@gmail.com',
  },
  {
    name: 'Kevin Jacobs',
    function: 'Technisch Coördinator',
    email: 'kevin.jacobs@sasja-antwerpen.be',
  },
  {
    name: 'Jos Riské',
    function: 'Technisch Coördinator',
    email: 'jos.riske@gmail.com',
  },
]

const coaches = [
  {
    name: 'Kevin Jacobs',
    function: 'T1',
    email: 'kevin.jacobs@sasja-antwerpen.be',
  },
  {
    name: 'Bart Van Ransbeeck',
    function: 'T2',
    email: 'bartvanransbeeck@telenet.be',
  },
  {
    name: 'Alex Jacobs',
    function: 'T3',
    email: 'alexjacobs266@gmail.com',
  },
]

const youthReferees = [
  {
    name: 'Robert Peeters',
    function: '',
    email: 'jeugd@sasja-antwerpen.be',
  },
  {
    name: 'Kenny Claes',
    function: '',
    email: 'jeugd@sasja-antwerpen.be',
  },
]
const youthCoaches = [
  {
    name: 'Jos Riské',
    function: '',
    email: '',
  },
  {
    name: 'Jan Brouwers',
    function: '',
    email: '',
  },
  {
    name: 'Broes Geens',
    function: '',
    email: '',
  },
  {
    name: 'Jörgen Sempels',
    function: '',
    email: '',
  },
  {
    name: 'Inge Servaes',
    function: '',
    email: '',
  },
  {
    name: 'Lars Celis',
    function: '',
    email: '',
  },
  {
    name: 'David André',
    function: '',
    email: '',
  },
  {
    name: 'Michael Leeman',
    function: '',
    email: '',
  },
  {
    name: 'Carl Bakx',
    function: '',
    email: '',
  },
]
const medicalStaff = [
  {
    name: 'Nick Jansen',
    function: 'Sportdokter',
    email: '',
  },
  {
    name: 'Achraf Bendahby',
    function: 'Kinesist',
    email: '',
  },
  {
    name: 'Kaat Soors',
    function: 'Kinesist',
    email: '',
  },
]

export default function werking() {
  return (
    <main className="space-y-16">
      <h1 className="sr-only">Werking</h1>
      <StaffOverview staff={topStaff} />
      <StaffOverview name="Clubbestuur" staff={board} />
      <StaffOverview name="Aanspreekpunt Integriteit" staff={api} />
      <StaffOverview name="Coördinators" staff={other} />
      <StaffOverview name="Jeugdbestuur" staff={youth} />
      <StaffOverview name="Coaches" staff={coaches} />
      <StaffOverview name="Coaches (Jeugd)" staff={youthCoaches} />
      <StaffOverview name="Jeugdscheidsrechterbegeleiders" staff={youthReferees} />
      <StaffOverview name="Medische cel" staff={medicalStaff} />
    </main>
  )
}
