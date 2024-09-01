import React from 'react'

import StaffCard from '@/components/cards/StaffCard'

import { StaffModel } from '@/types/models'

type Props = {
  staff: StaffModel[]
  name?: string
  description?: string
}

export default function StaffOverview({ staff, name = '', description = '' }: Props) {
  return (
    <section className="container grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
      {name && <h2 className="title1 col-span-1 tablet:col-span-2 laptop:col-span-3">{name}</h2>}
      {description && (
        <h4 className="title3 col-span-1 tablet:col-span-2 laptop:col-span-3">{description}</h4>
      )}
      {staff.map((staff, i) => (
        <StaffCard key={i} staff={staff} />
      ))}
    </section>
  )
}
