import { useRef, useState, useEffect, useContext } from "react"
import "./login.css"
import busImage from "@/assets/logos/bus.png"
import AuthContext from "@/context/AuthProvider"
import axios from "axios"
import { loginUser } from "../../lib/api/user-api"
import { UserAuthForm } from "./components/AuthForm"

const LOGIN_URL = "/api/v1/Authentication/LoginAsync"

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext)

  const userRef = useRef(null)
  const errRef = useRef(null)

  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [email, pwd])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      loginUser(email, pwd)
      .then((res) => {
        if(res.error){
          console.log(res.error)
          if (!res.error) {
            setErrMsg("No Sever Respone")
          } else if (res.error.statusCode === 400) {
            setErrMsg(res.error?.message || "Invalid Email or Password!")
          } else if (res.error.statusCode === 401) {
            setErrMsg("Unauthorize")
          } else {
            setErrMsg("Login Failed")
          }
        }else{
          console.log(JSON.stringify(respone?.data))
          const accessToken = respone?.data.accessToken
          const roles = respone?.data.roles
          setAuth({ email, pwd, roles, accessToken })
          setEmail("")
          setPwd("")
          setSuccess(true)
          // role direction
        }
      })
    } catch (err) {
      errRef?.current?.focus()
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            {/* route to homepage */}
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className="login-page">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="login-form">
            <span className="logo-name flex gap-2 items-center font-bold">
              <img
                style={{ width: "37px", height: "37px" }}
                src={busImage}
                alt="Logo image"
              />
              <p>BusDelivery</p>
            </span>
            <div className="login-header my-4">
              <h1 className="text-2xl font-bold">Login</h1>
              <p>Welcome to BusDelivery</p>
            </div>
            <UserAuthForm />
          </div>
        </section>
      )}
    </>
  )
}

export default LoginPage
