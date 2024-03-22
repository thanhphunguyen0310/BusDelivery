import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
import { getOrders } from "../../../../lib/api/order-api";

export default function ProccessList({ orders }) {

    return (
        <div className="w-full mt-4">
            <div className="p-2 space-y-4 h-[500px] overflow-y-scroll">
                {orders ? (

                    orders.length === 0 ? (
                        <div>Không có đơn hàng nào</div>
                    ) : (
                        <div>
                            {
                                orders.map((order, index) => (
                                    <OrderCard key={index} order={order} type={"process"} />
                                ))
                            }
                        </div>
                    )
                ) : (
                    <div>Không có đơn hàng nào</div>
                )}
            </div>
        </div>
    )
}