import { StaffModel } from '@/types/models'
import React from 'react'

type Props = {
  staff: StaffModel
}

export default function StaffCard({ staff }: Props) {
  return (
    <section className="card p-8">
      <h3 className="title2">{staff.function}</h3>
      <div className="mt-8 flex flex-col items-center space-y-2">
        <p className="text-lg text-dark">{staff.name}</p>
        <a href={`mailto:${staff.email}`} className="text-sm text-info underline">
          {staff.email}
        </a>
      </div>
    </section>
  )
}
