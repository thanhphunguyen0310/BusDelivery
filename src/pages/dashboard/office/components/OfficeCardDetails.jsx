import Office from "@/assets/icon/office.svg"
import React from 'react'
export default function OfficeCardDetails({
    office
}) {
  return (
    <div className='rounded-xl bg-[#F2F8FB] p-4 px-20 flex items-center gap-4 pt-0 pb-52'>
        <div>
            <img src={"data:image/jpeg;base64," + office?.image || BusIcon} alt="icon" className="h-52 w-52 rounded-sm" />
        </div>
        <div className='flex-1 flex flex-col self-start ml-10 gap-10 pt-40'>
            <span className='font-bold text-[#4BA2B6] text-3xl'>{office?.name}</span>
            <span className='text-2xl'><b>Địa chỉ: </b> {office?.address}</span>
            <span className='text-2xl'><b>Giờ hoạt động: </b> {office?.operationTime?.split("-")[0]}</span>
            <span className='text-2xl'><b>Giờ đóng cửa: </b> {office?.operationTime?.split("-")[1]}</span>
            <span className='text-2xl'><b>Số điện thoại: </b> {office?.contact}</span>
            <span className='text-2xl'><b>Trạng thái: </b> {office?.isActive ? "Hoạt động" : "Đóng cửa"}</span>
        </div>
    </div>
  )
}
