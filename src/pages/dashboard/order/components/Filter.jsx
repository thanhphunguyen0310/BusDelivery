import { useEffect, useState } from "react"
import { DatePicker } from "./DatePicker"
import { Input } from "@/components/ui/input"
import research from "@/assets/icon/research.svg"

export default function Filter({ search, setSearch, fromDate, toDate, setFromDate, setToDate}) {

  console.log(fromDate, toDate, search)

  return (
    <div className="w-full bg-[#eaf4fa] px-28 py-3 rounded-md space-y-2">
      <div className="w-full flex items-center justify-between">
        <DatePicker placeholder="Từ Ngày"  setDateProp={setFromDate} />
        <DatePicker placeholder="Đến Ngày" setDateProp={setToDate} />
      </div>
      <div className="relative">
        <Input
          placeholder="Nhập mã đơn hàng/tên sản phẩm"
          className="px-16"
          value={search}
          onChange={event => {
            setSearch(event.target.value)
          }}
        />
        <img
          src={research}
          alt="research"
          className="w-6 h-6 absolute left-4 top-2"
        />
      </div>
    </div>
  )
}
