"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { z } from "zod"
import { cn } from "../../../lib/utils"
import { loginUser } from "../../../lib/api/user-api"
const formLoginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ"
  }),
  password: z.string().min(3, {
    message: "Password ít nhất 3 ký tự"
  })
})

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    setIsLoading(true)
    loginUser(values?.email, values?.password)
    .then((res) => {
      if(res.error){
        console.log(res.error)
        if (!res.error) {
          toast.error("No Server Respone")
        } else if (res.error.statusCode === 400) {
          toast.error(res.error?.message || "Invalid Email or Password!")
        } else if (res.error.statusCode === 401) {
          toast.error("Unauthorize")
        } else if (res.error.statusCode === 404) {
          toast.error(res.error?.message || "Invalid Email or Password!"  )
        }else {
          toast.error("Login Failed")
        }
      }else{
        console.log(JSON.stringify(res?.data))
        const accessToken = res?.data.accessToken
        const roles = res?.data.roles
        localStorage.setItem("accessToken", res?.data?.data?.token)
        console.log(res?.data?.result?.accessToken)
        toast.success("Log in success", {
          position: "top-left"
        })
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      }
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className={cn("grid gap-6 space-y-4", className)} {...props}>
      <ToastContainer />
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full text-white bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
