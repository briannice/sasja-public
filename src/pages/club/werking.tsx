import StaffOverview from '@/components/StaffOverview'
import React from 'react'

const topStaff = [
  {
    name: 'Michael Leeman',
    function: 'Voorzitter',
    email: 'michael.leeman@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Iny Hofstede',
    function: 'Secretaris',
    email: 'iny.hofstede@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Alex Jacobs',
    function: 'Penningmeester',
    email: 'alexjacobs266@gmail.com',
    telephone: ''
  },
]

const board = [
  {
    name: 'Lynn Gordijn',
    function: 'Bestuurslid',
    email: '',
    telephone: ''
  },
]

const api = [
  {
    name: 'Kenny Claes',
    function: 'API',
    email: 'api@sasja-antwerpen.be',
    telephone: ''
  }
]

const youth = [
  {
    name: 'Michael Leeman',
    function: 'Jeugdvoorzitter',
    email: 'jeugd@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Inge Servaes',
    function: 'Kalenderverantwoordelijke',
    email: 'jeugd@sasja-antwerpen.be',
    telephone: ''
  },
]

const other = [
  {
    name: 'Alex Jacobs',
    function: 'Technisch Coördinator',
    email: 'alexjacobs266@gmail.com',
    telephone: ''
  },
  {
    name: 'Kevin Jacobs',
    function: 'Technisch Coördinator',
    email: 'kevin.jacobs@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Jos Riské',
    function: 'Technisch Coördinator',
    email: 'jos.riske@gmail.com',
    telephone: ''
  },
  {
    name: 'Inge Servaes',
    function: 'Promotieverantwoordelijke',
    email: 'inge.servaes@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Michael Leeman',
    function: 'Administratief Coördinator',
    email: 'michael.leeman@sasja-antwerpen.be',
    phone: '0499157422',
    telephone: ''
  },
  {
    name: 'Lynn Gordijn',
    function: 'Operationeel Coördinator',
    email: 'lynn.gordijn@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Nick Jansen',
    function: 'Medisch Coördinator',
    email: 'nick.jansen@telenet.be',
    telephone: ''
  }
]

const coaches = [
  {
    name: 'Kevin Jacobs',
    function: 'T1',
    email: 'kevin.jacobs@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Bart Van Ransbeeck',
    function: 'T2',
    email: 'bartvanransbeeck@telenet.be',
    telephone: ''
  },
  {
    name: 'Alex Jacobs',
    function: 'T3',
    email: 'alexjacobs266@gmail.com',
    telephone: ''
  },
]

const youthReferees = [
  {
    name: 'Robert Peeters',
    function: '',
    email: 'jeugd@sasja-antwerpen.be',
    telephone: ''
  },
  {
    name: 'Kenny Claes',
    function: '',
    email: 'jeugd@sasja-antwerpen.be',
    telephone: ''
  },
]
const youthCoaches = [
  {
    name: 'David André',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Carl Bakx',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Bob Beuckels',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Rik Beuckels',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Jan Brouwers',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Lars Celis',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Broes Geens',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Michael Leeman',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Jos Riské',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Jörgen Sempels',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Inge Servaes',
    function: '',
    email: '',
    telephone: ''
  },
  {
    name: 'Johannes Verhoeven',
    function: '',
    email: '',
    telephone: ''
  },
]
const medicalStaff = [
  {
    name: 'Nick Jansen',
    function: 'Medisch Coördinator',
    email: '',
    telephone: '0478643547'
  },
  {
    name: 'Nicolai Sake',
    function: 'Mental Coach',
    email: '',
    telephone: '0493675618'
  },
  {
    name: 'Kristof Dolhain',
    function: 'Voedingssupplementen',
    email: '',
    telephone: '0478209833'
  },
  {
    name: 'Robin De Roeck',
    function: 'Kinesist',
    email: '',
    telephone: '0494215224'
  },
  {
    name: 'Ralf De Roeck',
    function: 'Kinesist',
    email: '',
    telephone: '0495461289'
  },
  {
    name: 'Kobe Decorte',
    function: 'Kinesist',
    email: '',
    telephone: '0471394529'
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
      <StaffOverview name="Coaches (Jeugd)" description="(Alfabetisch)" staff={youthCoaches} />
      <StaffOverview name="Jeugdscheidsrechterbegeleiders" staff={youthReferees} />
      <StaffOverview name="Medische cel" staff={medicalStaff} />
    </main>
  )
}
