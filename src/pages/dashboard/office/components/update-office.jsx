
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { add, set } from "date-fns"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { createOffice, getOffice, updateOffice } from "../../../../lib/api/office-api"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  officeName: z.string("Office name is required"),
  latitude: z.string("Latitude is required"),
  longitude: z.string("Longitude is required"),
  address: z.string("Address is required"),
  openTime: z.string("Open time is required"),
  closeTime: z.string("Close time is required"),
  phone: z.string("Phone is required"),
  isActive: z.boolean(),
})
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export default function UpdateOffice() {
  const param = useParams()
  const officeId = +param.id
  const [file, setFile] = useState(null)
  const [imageError, setImageError] = useState()
  const [loading, setLoading] = useState(false)
  const [office, setRoute] = useState({})
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
    },
  })

  const init = async () => {
    getOffice(officeId)
      .then((res) => {
        if (res.error) {
          console.log(res.error)
        } else {
          setRoute(res.data?.data || {})
          form.setValue('officeName', res.data?.data?.name)
          form.setValue('latitude', res.data?.data?.lat)
          form.setValue('longitude', res.data?.data?.lng)
          form.setValue('address', res.data?.data?.address)
          form.setValue('phone', res.data?.data?.contact)
          form.setValue('isActive', res.data?.data?.isActive)

          // convert base64 to binary
          if (res.data?.data?.image) {
            const binary = atob(res.data?.data?.image)
            const array = []
            for (let i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i))
            }
            const blob = new Blob([new Uint8Array(array)], { type: "image/png" })
            setFile(blob)
          }

          const time = res.data?.data?.operationTime?.split(' - ')
          form.setValue('openTime', time[0])
          form.setValue('closeTime', time[1])
        }
      })
  }

  const handleUpdate = async (sendData) => {
    const response = await updateOffice(officeId, sendData);
    if (response.error) {
      toast.error("Cập nhật thất bại")
    } else {
      toast.success("Cập nhật thành công")
      navigate("/dashboard/office")
    }
    setLoading(false)
  }


  function onSubmit(values) {
    const sendData = {
      Name: values.officeName,
      Address: values.address,
      Lat: values.latitude,
      Lng: values.longitude,
      Contact: values.phone,
      OperationTime: `${values.openTime} - ${values.closeTime}`,
      Image: file ? file : null,
      IsActive: values.isActive,
    }
    handleUpdate(sendData)

  }

  const handleOpenTimeChange = (e) => {
    form.setValue('openTime', e.target.value)
  }
  const handleCloseTimeChange = (e) => {
    form.setValue('closeTime', e.target.value)
  }

  const handleFileChange = (e) => {
    const image = e.target.files[0]
    if (!imageMimeType.test(image.type)) {
      console.log('Invalid file type')
      setImageError('Invalid file type')
      setFile(null)
      return
    } else {
      setFile(image)
      setImageError(null)
    }
  }

  console.log(file)

  useEffect(() => {
    init()
  }, [officeId])


  return (
    <div className="flex justify-center mt-10">
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-2/3">
          <FormField
            control={form.control}
            name="officeName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel className="flex-1">Tên văn phòng</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Nhập tên văn phòng" {...field} />
                </FormControl>

              </FormItem>
            )}
          />
          <div className="flex gap-8 w-full ">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center">
                    <FormLabel className="flex-1">Vĩ độ</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Nhập vĩ độ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center">
                    <FormLabel className="flex-1">Kinh độ</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Nhập kinh độ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel className="flex-1">Địa chỉ</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-8 w-full items-center">
            <div className="flex gap-4 flex-1">
              <FormField
                control={form.control}
                name="openTime"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <div className="flex items-center">
                      <FormLabel className="flex-1">Thời gian mở cửa</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <input type="time" className="px-2 py-1 border-input border-[1px] rounded-md w-full text-base" {...field} onChange={handleOpenTimeChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="closeTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center">
                      <FormLabel className="flex-1">Thời gian đóng cửa</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <input type="time" className="px-2 py-1 border-input border-[1px] rounded-md w-full text-base" {...field} onChange={handleCloseTimeChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center">
                    <FormLabel className="flex-1">Số điện thoại</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8 w-full ">
            <FormField
              control={form.control}
              name=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-4">
                    <FormLabel className={`${imageError ? "text-red-500" : ""}`}>Ảnh</FormLabel>
                    {imageError && <FormMessage>{imageError}</FormMessage>}
                  </div>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="file" onChange={handleFileChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel className="text-base">
                    Kích hoạt?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Đang tải..." : "Cập nhật văn phòng"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
