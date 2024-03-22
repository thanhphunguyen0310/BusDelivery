import FindOffice from "@/assets/icon/find-office.svg"
import OfficeIcon from "@/assets/icon/list.svg"
import CreateOffice from "@/assets/icon/create-office.svg"
import { useEffect, useState } from "react"
import { OFFICES } from "./components/mock-data"
import OfficeCard from "./components/OfficeCard"
import { Search } from "lucide-react"
import { getOffices } from "../../../lib/api/office-api"
import { toast } from "react-toastify"
import CreateOfficeForm from "./components/create-office-form"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export default function OfficeManagementPage() {

  const [tabs, setTabs] = useState([
    {
      name: "Danh sách", isActive: true, icon: <div>
        <img src={OfficeIcon} alt="icon" className="h-14 w-14" />
      </div>
    },
    {
      name: "Tìm Office", isActive: false, icon:
        <div>
          <img src={FindOffice} alt="icon" className="h-14 w-14" />
        </div>
    },
    {
      name: "Tạo mới office", isActive: false, icon:
        <div>
          <img src={CreateOffice} alt="icon" className="h-14 w-14" />
        </div>
    }
  ])

  const [offices, setOffices] = useState([])
  const [searchOffices, setSearchOffices] = useState([])
  const [searchParams, setSearchParams] = useState("")
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)


  const handleSetTabs = (index) => {
    const newTabs = tabs.map((t, i) => {
      if (index === i) {
        return { ...t, isActive: true }
      }
      return { ...t, isActive: false }
    })
    setSearchParams("")
    setTabs(newTabs)
  }
  
  const reRender = useSelector(state => state.reRender.reRender)
  useEffect(() => {
    const init = async () => {
      getOffices(searchParams, pageIndex, pageSize)
        .then((res) => {
          if (res.error) {
            console.log(res.error)
            toast.error("Lỗi lấy dữ liệu")
          } else {
            console.log(res.data)
            setOffices(res.data?.data?.items || [])
            setTotal(res.data?.data?.totalCount || 0)

            if (searchParams != "") {
              console.log(searchParams)
              setSearchOffices(res.data?.data?.items || [])
            }else{
              setSearchOffices([])
            }
          }
        })
    }
    init()
  }, [reRender, pageIndex, pageSize, searchParams])

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
                handleSetTabs(index)
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
      <div className="p-2">{tabs[0].isActive ?
        <div className="h-[80vh] overflow-y-scroll space-y-4">
          {
            offices.map((office, index) => (
              <OfficeCard key={index} office={office} />
            ))
          }
        </div>
        : <div>
          {
            tabs[1].isActive ?
              <div className="h-[8  0vh] overflow-y-scroll space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nhập tên văn phòng"
                      className="w-full p-4 rounded-xl border-2 border-gray-300 pl-16"
                      values={
                        searchParams
                      }
                      onChange={
                        (e) => {
                          setSearchParams(e.target.value)
                          setPageIndex(1)
                        }
                      }
                    />
                    <Search className="absolute left-6 top-5 text-gray-400"
                    />
                  </div>
                  <div className="py-2 px-4 bg-slate-200 rounded-md mt-4">
                    Có {
                      " "
                    }
                    {
                      searchParams == "" ? 0 : total
                    }
                    {
                      " "
                    }
                    địa điểm/tên trùng với tìm kiếm
                  </div>
                </div>
                {
                  searchOffices.map((office, index) => (
                    <OfficeCard key={index} office={office} />
                  ))
                }
              </div>
              :
              <div>
                <CreateOfficeForm handleSetTabs={handleSetTabs}/>
              </div>
          }
        </div>

      }
      </div>
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
