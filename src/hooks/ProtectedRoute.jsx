import Loading from "@/components/loading"
import { checkToken } from "@/lib/api/login"
import { login, updateUser } from "@/lib/redux/currentUserSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProtectedRoute({ children }) {
  const authenticated = useSelector(store => store.currentUser.authenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      checkToken().then(res => {
        if (res?.error) {
          toast.error("Please login to continue", {
            position: "top-left"
          })
          console.log("Please login to continue")
          navigate("/login")
          return
        }

        if (res?.data) {
          dispatch(updateUser(res?.data?.result?.user))
          dispatch(login())
        }
      })
    }
    init()
  }, [])

  return authenticated ? (
    <div>{children}</div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading></Loading>
    </div>
  )
}
