import React from 'react'
import BusIcon from "@/assets/icon/bus-circle.svg"
import List from "@/assets/icon/document.svg"
import Clock from "@/assets/icon/clock.svg"
import { Link } from 'react-router-dom'
export default function BusRoute({
    route
}) {
  
    // id: 1294,
    // name: 'Thanh Vĩnh Đông - Bến xe Chợ Lớn',
    // description: 
    //   'Bến xe Thanh Vĩnh Đông (Tỉnh Long An) – Tỉnh lộ 827A – Ngã 4 Phú Long – Tỉnh lộ 827A – Nguyễn Đình Chiểu – Hùng Vương (Tỉnh Long An) – Quốc lộ 62 - Đường tránh Thị xã Tân An - Quốc lộ 1A – Kinh Dương Vương (Thanh phố Hồ Chí Minh) – Hồng Bàng – Phú Hữu – Bến xe Chợ Lớn.',
    // isActive: true,
    // startPoint: 'Thanh Vĩnh Đông',
    // endPoint: 'Bến xe Chợ Lớn',
    // operateTime: '03:45 - 19:10',
    // stations: null
    console.log(route)
    return (
    <div className='rounded-xl bg-slate-200 p-4 px-6 flex items-center gap-4'>
        <div>
            <img src={BusIcon} alt="icon" className="h-32 w-32" />
        </div>
        <div className='flex-1 flex flex-col self-start ml-10 gap-2'>
            <span className='font-bold text-[#4BA2B6]'>{route?.name}</span>
            <span className='text-[16px]'>{route?.startPoint} - {route?.endPoint}</span>
            <span className='flex gap-2 items-center'>
                <img src={Clock} alt="icon" className="h-10 w-10" />
                {route?.operateTime}
            </span>
        </div>
        <Link to={"/dashboard/bus/"+route?.id} className='p-4 flex items-center gap-4 cursor-pointer'>
            <div>
                <img src={List} alt="icon" className="h-10 w-10" />
            </div>
            Xem chi tiết
        </Link>
    </div>
  )
}
