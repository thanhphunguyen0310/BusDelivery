import AdminIcon from "@/assets/icon/admin.svg";
import BusLogo from "@/assets/icon/bus1.svg";
import MapIcon from "@/assets/icon/maps.svg";
export default function Header() {
  return (
    <header className="sticky top-0 bg-[#4BA2B6]">
      <nav className="flex items-center py-3 px-10 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-12 h12 p-2 bg-[#7AC8DA] rounded-md border-white border-2">
          <img src={BusLogo} alt="BusLogo" className="w-full h-full" />
        </div>
        <h3 className="text-white text-xl font-bold">BusDelivery</h3>
      </div>
      <section className="flex gap-8">
        <div className="flex gap-2 items-center rounded-xl border-white border-2 px-2 py-1 cursor-pointer">
          <img src={AdminIcon} alt="admin" />
          <span className="font-bold text-white">Admin</span>
        </div>
        <div className="border-r-2"></div>
        <div className="flex gap-4 items-center rounded-xl border-white border-2 px-2 py-1 cursor-pointer bg-white text-black">
          <img src={MapIcon} alt="MapIcon" />
          <span>TP Hồ Chí Minh</span>
        </div>
      </section>
      </nav>
    </header>
  )
}
