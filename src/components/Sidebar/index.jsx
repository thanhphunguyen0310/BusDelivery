import { cx } from "class-variance-authority"
import { Menu, XIcon, LogOutIcon } from "lucide-react"
import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import HomeIcon from "@/assets/icon/home.svg"
import OfficeIcon from "@/assets/icon/office-management.svg"
import OrderIcon from "@/assets/icon/order-management.svg"
import BusIcon from "@/assets/icon/route management.svg"
import StaffIcon from "@/assets/icon/staff.svg"
import SettingIcon from "@/assets/icon/settings.svg"
import MapIcon  from "@/assets/icon/map.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Home",
    icon: (
      <div>
        <img src={HomeIcon} alt="icon" className="h-10 w-10" />
      </div>
    ),
    link: "/home"
  },
  {
    title: "Quản lí văn phòng",
    icon: (
      <div>
        <img src={OfficeIcon} alt="icon" className="h-10 w-10" />
      </div>
    ),
    link: "/dashboard/office"
  },
  {
    title: "Quản lí tuyến xe",
    icon: (
      <div>
        <img src={BusIcon} alt="icon" className="h-10 w-10" />
      </div>
    ),
    link: "/dashboard/bus"
  },
  {
    title: "Quản lí đơn hàng",
    icon: (
      <div>
        <img src={OrderIcon} alt="icon" className="h-10 w-10" />
      </div>
    ),
    link: "/dashboard/order"
  },
  {
    title: "Quản lí nhân viên",
    icon: (
      <div>
        <img src={StaffIcon} alt="icon" className="h-10 w-10" />
      </div>
    ),
    link: "/dashboard/staff"
  },
  // {
  //   title: "Bản đồ",
  //   icon: <img src={MapIcon} alt="icon" className="h-10 w-10" />,
  //   link: "/map" 
  // },
  {
    title: "Cài đặt",
    icon: <img src={SettingIcon} alt="icon" className="h-10 w-10" />,
    options: [
      {
        title: "Logout",
        // action: handleLogout,
        icon: <LogOutIcon size={16} />,
        key: "logout"
      }
    ]
  }
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
    <button
      className={"flex items-center ml-5"}
      onClick={() => setIsOpen(!isOpen)}
    >
      {!isOpen ? <Menu size={24} /> : <XIcon size={24} />}
    </button>
    <ul className="space-y-2 mt-4">
      {menuItems.map(item => (
        <div key={item.title}>
          {item.options ? (
            <>
              <div
                className={cn(
                  "flex gap-4 items-center cursor-pointer hover:bg-[#B8F2FF] rounded-xl p-4",
                  location && location.pathname.toLowerCase() === (item.link || "").toLowerCase() &&
                  "bg-[#B8F2FF]"
                )}
                onClick={toggleSettings}
              >
                {item.icon}
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames={"fade"}
                  unmountOnExit
                >
                  <span>{item.title}</span>
                </CSSTransition>
              </div>
              <CSSTransition
                in={showSettings} // Show dropdown only when state is true
                timeout={200}
                classNames={"fade"}
                unmountOnExit
              >
                <div className="pl-8"> {/* Indent dropdown content */}
                  {item.options.map(option => (
                    <div
                      key={option.key}
                      className="flex items-center cursor-pointer hover:bg-[#B8F2FF] rounded-xl p-2"
                      onClick={option.action || handleLogout}
                    >
                      {option.icon}
                      <span className="ml-2">{option.title}</span>
                    </div>
                  ))}
                </div>
              </CSSTransition>
            </>
          ) : ( // If menu item doesn't have options, render as usual
            <Link to={item.link}>
              <div
                className={cn(
                  "flex gap-4 items-center cursor-pointer hover:bg-[#B8F2FF] rounded-xl p-4",
                  location.pathname.toLowerCase() == item.link.toLowerCase() &&
                  "bg-[#B8F2FF]"
                )}
              >
                {item.icon}
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames={"fade"}
                  unmountOnExit
                >
                  <span>{item.title}</span>
                </CSSTransition>
              </div>
            </Link>
          )}
        </div>
      ))}
    </ul>
  </div>
)}


export default Sidebar
