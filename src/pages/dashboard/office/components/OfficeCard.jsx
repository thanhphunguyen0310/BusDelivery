import React from "react";
import BusIcon from "@/assets/icon/office.svg";
import List from "@/assets/icon/document.svg";
import Clock from "@/assets/icon/clock.svg";
import Pencil from "@/assets/icon/pencil.svg";
import Bin from "@/assets/icon/bin.svg";
import CheckList from "@/assets/icon/to-do-list.svg";
import Money from "@/assets/icon/money.svg";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../lib/formatPrice";
import DeleteButton from "./DeleteButton";
export default function OfficeCard({ office }) {
    console.log(office);
    // id: 4,
    // name: 'BusDelivery(Trần Hưng Đạo)',
    // address: '567A Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, Thành phố Hồ Chí Minh',
    // lat: '10.756916906074192',
    // lng: '106.68589420445201',
    // contact: '0908055555',
    // image:
    //   'https://busdeliveryimage.blob.core.windows.net/busdelivery/offices/BusDelivery%28Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%29-1709710224',
    // isActive: true
    console.log(office?.image);

    if(office?.isActive === false) return null

    return (
        <div className="rounded-xl bg-slate-200 p-4 px-6 flex items-center gap-4">
            <div>
                <img
                    src={"data:image/jpeg;base64," + office?.image || BusIcon}
                    alt="icon"
                    className="h-32 w-32 rounded-sm"
                />
            </div>
            <div className="flex-1 flex flex-col ml-10 gap-4">
                <span className="font-bold text-[#4BA2B6]">{office?.name}</span>
                {/* <span className="flex gap-2 items-center">
                    <img src={CheckList} alt="icon" className="h-10 w-10" />
                    <span>Có {office?.orderQuantity || 0} đơn hàng</span>
                </span> */}
                <div className="self-stretch flex gap-2">
                    <span className="flex gap-2 items-center">
                        <img src={Clock} alt="icon" className="h-10 w-10" />
                        {office?.operationTime}
                    </span>
                    {/* <span className="flex gap-2 items-center flex-1 flex justify-center">
                        <img src={Money} alt="icon" className="h-10 w-10" />
                        {formatPrice(office?.totalRevenue || 0)}
                    </span> */}
                </div>
            </div>
            <div>
                <Link
                    to={"/dashboard/office/" + office?.id}
                    className="p-2 flex items-center gap-4 cursor-pointer"
                >
                    <div>
                        <img src={List} alt="icon" className="h-10 w-10" />
                    </div>
                    Xem chi tiết
                </Link>
                <div className="p-2 flex items-center gap-4 cursor-pointer">
                    <Link
                        to={`/dashboard/office/update/${office?.id}`}
                        className="flex items-center gap-4"
                    >
                        <div>
                            <img src={Pencil} alt="icon" className="h-10 w-10" />
                        </div>
                        Chỉnh sửa
                    </Link>
                </div>
                <DeleteButton
                    children={
                        <div className="p-2 flex items-center gap-4 cursor-pointer">
                            <div>
                                <img src={Bin} alt="icon" className="h-10 w-10" />
                            </div>
                            Xóa
                        </div>
                    }
                    id={office?.id}
                />
            </div>
        </div>
    );
}
