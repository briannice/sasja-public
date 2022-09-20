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

const youthStaff = [
  {
    name: 'Inge Servaes',
    function: 'Promotieverantwoordelijke',
    email: 'inge.servaes@sasja-antwerpen.be',
  },
  {
    name: 'Michael Leeman',
    function: 'Administratieve coördinator',
    email: 'michael.leeman@sasja-antwerpen.be',
    phone: '0499157422',
  },
  {
    name: 'Carrie Claes',
    function: 'Vrijwilligers coördinator',
    email: 'carrie.claes@gmail.com',
  },
  {
    name: 'Kenny Claes',
    function: 'API',
    email: 'kenny.claes@sasja-antwerpen.be',
  },
  {
    name: 'Kevin Jacobs',
    function: 'Jeugdcoördinator',
    email: 'kj_joppe@hotmail.com',
  },
  {
    name: 'Alex Jacobs',
    function: 'Jeugdcoördinator',
    email: 'alexjacobs266@gmail.com',
  },
  {
    name: 'Robert Peeters',
    function: 'JSR’s begeleiding',
    email: '',
  },
  {
    name: 'Kenny Claes',
    function: 'JSR’s begeleiding',
    email: 'kenny.claes@sasja-antwerpen.be',
  },
]

const sportStaff = [
  {
    name: 'Kevin Jacobs',
    function: '',
    email: 'kj_joppe@hotmail.com',
  },
  {
    name: 'Alex Jacobs',
    function: '',
    email: 'alex.jacobs@telenet.be',
  },
  {
    name: 'Bart Van Ransbeeck',
    function: '',
    email: 'bartvanransbeeck@telenet.be',
  },
  {
    name: 'Jos Riské',
    function: '',
    email: 'jos.riske@gmail.com',
  },
]

const medicalStaff = [
  {
    name: 'Nick Jansen',
    function: 'Sportdokter',
    email: 'nick.jansen@telenet.be',
  },
  {
    name: 'Jente Wagemans',
    function: 'Kinesist',
    email: '',
  },
]

export default function werking() {
  return (
    <main className="space-y-16">
      <h1 className="sr-only">Werking</h1>
      <StaffOverview staff={topStaff} />
      <StaffOverview name="Jeugd cel" staff={youthStaff} />
      <StaffOverview name="Sportieve cel" staff={sportStaff} />
      <StaffOverview name="Medische cel" staff={medicalStaff} />
    </main>
  )
}
