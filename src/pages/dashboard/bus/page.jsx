import BusLine from "@/assets/icon/bus-lane.svg"
import OfficeIcon from "@/assets/icon/list.svg"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { getBusRoutes } from "../../../lib/api/bus-api"
import BusRoute from "./components/BusRoute"
import { set } from "date-fns"

export default function BusManagementPage() {
  const [tabs, setTabs] = useState([
    {
      name: "Danh sách", isActive: true, icon: <div>
        <img src={OfficeIcon} alt="icon" className="h-14 w-14" />
      </div>
    },
    {
      name: "Tìm tuyến xe", isActive: false, icon:
        <div>
          <img src={BusLine} alt="icon" className="h-14 w-14" />
        </div>
    }
  ])

  const [busRoutes, setBusRoutes] = useState([])
  const [searchParams, setSearchParams] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  console.log(
    pageIndex,
    pageSize,
    searchParams,
    total
  )
  console.log(searchParams)


  useEffect(() => {
    getBusRoutes(
      pageIndex,
      pageSize,
      searchParams,
    )
      .then((res) => {
        if (res.error) {
          console.log(res.error)
        } else {
          console.log(res.data?.data)
          setBusRoutes(res.data?.data?.items || [])
          setTotal(res.data?.data?.totalCount || 0)
          if (searchParams != "") {
            console.log(searchParams)
            setSearchResult(res.data?.data?.items || [])
          }else{
            setSearchResult([])
          }
        }
      })
  }, [
    pageIndex, pageSize, searchParams
  ])

  return (
    <div className="w-full">
      <section className="flex w-full">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex-1 py-4 ${tab.isActive
              ? "border-b-2 border-[#4BA2B6]"
              : "border-b-2 border-transparent"
              }`}
          >
            <button
              className="w-full flex justify-center gap-4 items-center"
              onClick={() => {
                const newTabs = tabs.map((t, i) => {
                  if (index === i) {
                    return { ...t, isActive: true }
                  }
                  return { ...t, isActive: false }
                })
                setSearchParams("")
                setTabs(newTabs)
              }}
            >
              {
                tab.icon
              }
              {tab.name}
            </button>
          </div>
        ))}
      </section>
      <div className="p-2 h-[75vh] overflow-scroll">{tabs[0].isActive ?
        <div className="h-[80vh] overflow-y-scroll space-y-4">
          {
            busRoutes.map((route, index) => (
              <BusRoute key={index} route={route} />
            ))
          }
        </div>
        :
        <div className="h-[80vh] overflow-y-scroll space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tên tuyến xe"
                className="w-full p-4 rounded-xl border-2 border-gray-300 pl-16"
                onChange={(e) => {
                  setSearchParams(e.target.value)
                  setPageIndex(1)
                }}
                value={searchParams}
              />
              <Search className="absolute left-6 top-5 text-gray-400" />
            </div>
            <div className="py-2 px-4 bg-slate-200 rounded-md mt-4">
              Có {
                (searchParams == "" ? 0 : total)
                + " "}  tên trùng với tìm kiếm
            </div>
          </div>
          {
            searchResult?.map((route, index) => (
              <BusRoute key={index} route={route} />
            ))
          }
        </div>
      }
      </div>
      {/* paging */}
      {
        (searchParams != "" || tabs[0].isActive) && (
          <div className="flex justify-center">
      <div className="grid grid-cols-3 w-[500px] gap-4 items-center mt-2">
        {
          pageIndex != 1 ? (
            <button
              className="p-2 bg-slate-200 rounded-md cursor-pointer"
              onClick={() => {
                setPageIndex(pageIndex - 1)
              }}
            >
              Trang trước
            </button>
          ) : (
            <div></div>
          )
        }
          Trang {pageIndex} / {Math.ceil(total / pageSize)}
        {
          !(pageIndex * pageSize >= total) ? (
            <button
              className="p-2 bg-slate-200 rounded-md cursor-pointer"
              onClick={() => {
                setPageIndex(pageIndex + 1)
              }}
            >
              Trang sau
            </button>
          ) : (
            <div></div>
          )
        }
        </div>
      </div>
        )
      }
    </div>
  )
}
