import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { ToastContainer } from 'react-toastify'

export default function DashboardLayout() {
  return (
    <div className='h-screen w-full'>
      <Header />
      <div className='h-[calc(100vh-74px)] w-full flex'>
        <Sidebar />
        <div className='overflow-y-scroll w-full flex-1'>
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}
