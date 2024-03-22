import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import List from "@/assets/icon/back.svg"
import BusRouteDetails from '../components/BusRouteDetails';
import { getBusRoute } from '../../../../lib/api/bus-api';
export default function BusDetaisPage() {
    const navigate = useNavigate();
    const { id } = useParams()

    function handleClick() {
        navigate(-1)
    }
    const [route, setRoute] = useState({})

    useEffect(() => {
        const init = async () => {
            getBusRoute(id)
            .then((res) => {
                if(res.error){
                    console.log(res.error)
                }else{
                    console.log(res.data)
                    setRoute(res.data?.data || {})
                }
            })
            
        }
        init()
    }, [])

  return (
    <div>
        <div onClick={handleClick} className='flex items-center gap-2 w-fit p-4 cursor-pointer'>
            <div>
                <img src={List} alt="icon" className="h-16 w-16" />
            </div>
            <button>Quay lại</button>
        </div>
        <BusRouteDetails route={route}/>
    </div>
  )
}
