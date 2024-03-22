import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import HomePage from "./pages/home/index.jsx"
import { store } from "./store/store.js"
import DashboardLayout from "./components/layout/DashboardLayout.jsx"
import OfficeManagementPage from "./pages/dashboard/office/page.jsx"
import BusManagementPage from "./pages/dashboard/bus/page.jsx"
import OrderManagementPage from "./pages/dashboard/order/page.jsx"
import ErrorPage from "./pages/error/ErrorPage.jsx"
import LoginPage from "@/pages/login"
import BusDetaisPage from "./pages/dashboard/bus/bus-details/page.jsx"
import OrderDetails from "./pages/dashboard/order/components/OrderDetails.jsx"
import OfficeDetails from "./pages/dashboard/office/office-details/page.jsx"
import 'react-toastify/dist/ReactToastify.css';
import UpdateOffice from "./pages/dashboard/office/components/update-office.jsx"
import ManageStaff from "./pages/dashboard/staff/page.jsx"
import CreateStaff from './pages/dashboard/staff/createStaff';
import UpdateStaff from "./pages/dashboard/staff/updateStaff.jsx"
import Map from "./pages/map/index.jsx"
const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/office",
        element: <OfficeManagementPage />,
      },
      {
        path: "/dashboard/office/:id",
        element: <OfficeDetails />
      },
      {
        path: "/dashboard/office/update/:id",
        element: <UpdateOffice />
      },
      {
        path: "/dashboard/bus",
        element: <BusManagementPage />
      },
      {
        path: "/dashboard/bus/:id",
        element: <BusDetaisPage />
      },
      {
        path: "/dashboard/order",
        element: <OrderManagementPage />,
      },
      {
        path: "/dashboard/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/dashboard/staff",
        element: <ManageStaff />
      },
      {
        path: "/dashboard/createStaff",
        element: <CreateStaff />
      },
      {
        path: "/dashboard/updateStaff/:id",
        element: <UpdateStaff />
      }
    ]
  },
  // {
  //   path: "/map",
  //   element: <Map />
  // },
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
