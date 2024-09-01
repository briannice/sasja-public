import React from 'react'

import { StaffModel } from '@/types/models'

type Props = {
  staff: StaffModel
}

export default function StaffCard({ staff }: Props) {
  return (
    <section className="card p-8">
      <h3 className="title2">{staff.function}</h3>
      <div className="mt-8 flex flex-col items-center space-y-2">
        <p className="text-lg text-dark">{staff.name}</p>
        {staff.email && (
          <a href={`mailto:${staff.email}`} className="text-sm text-info underline">
            {staff.email}
          </a>
        )}
        {staff.telephone && (
          <a href={`tel:${staff.telephone}`} className="text-sm text-info underline">
            {staff.telephone}
          </a>
        )}
      </div>
    </section>
  )
}
