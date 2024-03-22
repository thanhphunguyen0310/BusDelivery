import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteOffice } from "../../../../lib/api/office-api"
import { toast } from "react-toastify"
import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { reRender } from "../../../../store/feature/reRenderSlice"

export default function DeleteButton({ children, id }) {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const response = await deleteOffice(id)
        if (response.error) {
            toast.error("Lỗi xóa Office")
        } else {
            toast.success("Xóa Office thành công")
            navigate("/dashboard/office")
            dispatch(reRender())
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bạn có chắc chắn muốn xóa Office này không??</DialogTitle>
                        <DialogDescription>
                            Hành động này không thể hoàn tác nếu bạn xóa Office này sẽ mất hết dữ liệu liên quan đến Office này và không thể khôi phục lại được nữa.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-white border-input border-[1px] text-black hover:bg-slate-100">Hủy</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => handleDelete(id)} className="bg-red-200 text-red-500 hover:bg-red-300">Xóa</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
