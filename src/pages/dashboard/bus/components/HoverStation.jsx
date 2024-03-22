import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOffice } from '../../../../lib/api/office-api'

export default function HoverStation({
    station
}) {
    const [office, setOffice] = useState({})
    const navigate = useNavigate()

    console.log(station)

    useEffect(() => {
      const init = async () => {
        getOffice(station?.officeId)
          .then((res) => {
            if (res.error) {
              console.log(res.error)
            } else {
              console.log(res.data?.data)
              setOffice(res.data?.data || {})
            }
          })
      }
      init()
    }, [])
    

    return (
      <HoverCard>
        <HoverCardTrigger className="cursor-pointer underline" onClick={() => (navigate("/dashboard/office/"+station?.officeId))}>{station?.name}</HoverCardTrigger>
        <HoverCardContent>
          <div className="text-lg font-bold">
            {station?.name}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span  className="text-sm">Name: {office?.name}</span>
            <span className="text-sm">Address: {office?.address}</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
}
