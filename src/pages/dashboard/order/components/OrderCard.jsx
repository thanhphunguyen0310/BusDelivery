import orderImage from "@/assets/images/orderImage.png";
import { formatPrice } from "@/lib/formatPrice";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getPackageById } from "../../../../lib/api/package-api";
import { getOffice } from "../../../../lib/api/office-api";
import { format } from "date-fns";

export default function OrderCard({ order, type }) {
  const [fromOffice, setFromOffice] = useState({});
  const [toOffice, setToOffice] = useState({});

  const handleGetOfficeById = async (officeId) => {
    const response = await getOffice(officeId);
    return response?.data?.data;
  };
  const handleGetPackageById = async () => {
    const from = await handleGetOfficeById(order?.fromOfficeId);
    setFromOffice(from);
    const to = await handleGetOfficeById(order?.toOfficeId);
    setToOffice(to);
  };

  useEffect(() => {
    handleGetPackageById();
  }, [order]);

  return (
    <div
      className={`grid grid-cols-5 bg-[#ededed] p-2 rounded-md my-2 ${
        type === "process"
          ? order?.status === 0 && "hidden"
          : order?.status !== 0 && "hidden"
      }`}
    >
      <div className="col-span-1 flex items-center justify-center bg-white rounded-md">
        <img
          src={`data:image/png;base64, ` + order?.image || orderImage}
          alt=""
        />
      </div>
      <div className="col-span-3 px-3">
        <div className="font-semibold text-[#50a4b8] text-sm">
          Mã package: {order?.id}
        </div>
        <div className="grid grid-cols-2">
          <div className="font-semibold text-sm col-span-1">
            Tên Sản Phẩm:{" "}
            <span className="text-sm font-normal truncate">{order?.note}</span>
          </div>
          <div className="font-semibold text-sm col-span-1 truncate">
            Khối lượng:{" "}
            <span className="text-sm font-normal">{order?.totalWeight} kg</span>
          </div>
        </div>
        <div className="font-semibold text-sm">
          Địa chỉ:{" "}
          <span className="text-sm font-normal truncate">
            {toOffice?.address}
          </span>
        </div>
        <div className="font-semibold text-sm">
          Từ trạm:{" "}
          <span className="text-sm font-normal truncate">
            {fromOffice?.name}
          </span>
        </div>
        <div className="font-semibold text-sm">
          Đến Trạm:{" "}
          <span className="text-sm font-normal truncate">{toOffice?.name}</span>
        </div>
        <div className="font-semibold text-sm">
          Ngày tạo đơn:{" "}
          <span className="text-sm font-normal truncate">
            {order?.createTime}
          </span>
        </div>
      </div>
      <div className="col-span-1 grid grid-rows-3 gap-2">
        <div className="row-span-1 flex items-start gap-2 text-base hover:cursor-pointer text-blue-500 hover:underline">
          <Link to={`/dashboard/order/${order?.id}`}>Xem chi tiết</Link>
        </div>

        {order?.status === 1 ? (
          <div className="row-span-1 flex justify-center font-bold items-center text-base text-green-500 bg-green-200 border-2  w-full rounded-full h-10">
            Đã xử lý
          </div>
        ) : (
          <>
            {order?.status === 0 ? (
              <div className="row-span-1 flex justify-center font-bold items-center text-base text-gray-500 bg-gray-200 border-2  w-full rounded-full h-10">
                Đang xử lí
              </div>
            ) : (
              <>
                {order?.status === 4 ? (
                  <div className="row-span-1 flex justify-center font-bold items-center text-base text-red-500 bg-red-200 border-2  w-full rounded-full h-10">
                    Đã xóa
                  </div>
                ) : (
                  <>
                    {order?.status === 5 ? (
                      <div className="row-span-1 flex justify-center font-bold items-center text-base text-blue-500 bg-blue-200 border-2  w-full rounded-full h-10">
                        Đã tạo đơn
                      </div>
                    ) : (
                      <>
                        <div className="row-span-1 flex justify-center font-bold items-center text-base text-red-500 bg-red-200 border-2  w-full rounded-full h-10">
                          Đã hủy
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        <div className="row-span-1 text-lg font-semibold text-red-500 flex items-end">
          Tổng tiền: {formatPrice(order?.totalPrice || 0)}
        </div>
      </div>
    </div>
  );
}

// order:
// {
//   id: 3,
//   packageId: 3,
//   image:
//     'https://busdeliveryimage.blob.core.windows.net/busdelivery/orders/0768664895-System.Func%601%5BSystem.Int64%5D-1709708233',
//   weight: 0.4,
//   price: 400000,
//   note: 'Hộp đựng mắt kính HMK',
//   contact: '0768664895'
// }

// packageInfo:
// {
//   id: 3,
//   busId: 2,
//   fromOfficeId: 4,
//   toOfficeId: 1,
//   stationId: 4,
//   quantity: 2,
//   totalWeight: 0.8,
//   totalPrice: 100000,
//   image:
//     'https://busdeliveryimage.blob.core.windows.net/busdelivery/packages/4-System.Func%601%5BSystem.Int64%5D-1710051685',
//   note: '..',
//   status: 0,
//   createTime: '2/29/2024 2:20:01 PM'
// }
// fromOffice:
// {
//   id: 4,
//   name: 'BusDelivery(Trần Hưng Đạo)',
//   address: '567A Đ. Trần Hưng Đạo, Cầu Kho, Quận 1, Thành phố Hồ Chí Minh',
//   lat: '10.756916906074192',
//   lng: '106.68589420445201',
//   contact: '0908055555',
//   image: null,
//   isActive: true
// }
// toOffice:
// {
//   id: 1,
//   name: 'BusDelivery(Hai Bà Trưng)',
//   address: '34 Hai Bà Trưng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
//   lat: '10.777028018050977',
//   lng: '106.7047978540785',
//   contact: '0908071111',
//   image: null,
//   isActive: true
// }
