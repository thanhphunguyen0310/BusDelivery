
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
import { useState } from "react"
import { createOffice } from "../../../../lib/api/office-api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { reRender } from "../../../../store/feature/reRenderSlice"

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


export default function CreateOfficeForm({
    handleSetTabs
}) {
    const [file, setFile] = useState(null)
    const [imageError, setImageError] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isActive: true,
        },
    })
    const navigate = useNavigate()

    const handleCreateOffice = async (values) => {
        const response = await createOffice(values)
        if (response.error) {
            toast.error("Lỗi tạo văn phòng")
        }
        if (response.data?.isSuccess) {
            toast.success("Tạo văn phòng thành công")
            dispatch(reRender())
            navigate("/dashboard/office")
            handleSetTabs(0)
        } else {
            toast.error("Lỗi tạo văn phòng")
        }

    }

    function onSubmit(values) {
        setLoading(true)
        const sendData = {
            Name: values.officeName,
            Address: values.address,
            Lat: values.latitude,
            Lng: values.longitude,
            Contact: values.phone,
            OperationTime: `${values.openTime} - ${values.closeTime}`,
            Image: file,
            IsActive: values.isActive,
        }
        handleCreateOffice(sendData).finally(() => {
            setLoading(false)
        })

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


    return (
        <div className="flex justify-center">
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
                        {loading ? "Đang tải..." : "Tạo văn phòng"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
