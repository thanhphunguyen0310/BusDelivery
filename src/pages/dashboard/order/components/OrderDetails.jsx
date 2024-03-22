import orderImage from "@/assets/images/orderImage.png";
import { formatPrice } from "@/lib/formatPrice";
import { formatDateTime } from "@/lib/formatTime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, getOrders } from "../../../../lib/api/order-api";
import { getPackageById } from "../../../../lib/api/package-api";
import { getOffice } from "../../../../lib/api/office-api";
import { getBusById } from "../../../../lib/api/bus-api";
import List from "@/assets/icon/back.svg";
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
// bus:
// {
//   id: 2,
//   number: '1',
//   plateNumber: '11L-6789',
//   name: 'Bến Thành - Bến xe buýt Chợ Lớn',
//   organization: 'Cty TNHH Du lịch, Dịch vụ Xây dựng Bảo Yến',
//   color: '#FFB07C',
//   numberOfSeat: '50',
//   operateTime: '05:00 - 20:15',
//   isActive: true
// }

export default function OrderDetails() {
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [packageData, setPackageData] = useState(null);
  const [fromOffice, setFromOffice] = useState({});
  const [toOffice, setToOffice] = useState({});
  const [bus, setBus] = useState({});
  const navigate = useNavigate();

  const id = useParams().id;
  function handleClick() {
    navigate(-1);
  }
  const handleGetOrderById = async () => {
    const response = await getOrderById(id);
    setOrder(response?.data);
    if (response?.data?.packageId) {
      await handleGetPackageById(response?.data?.packageId);
    }
  };

  // const handleGetPackageById = async (packageId) => {
  //   const response = await getPackageById(packageId);
  //   setPackageData(response?.data);
  //   if (response?.data?.fromOfficeId && response?.data?.toOfficeId) {
  //     const from = await handleGetOfficeById(response?.data?.fromOfficeId);
  //     setFromOffice(from);
  //     const to = await handleGetOfficeById(response?.data?.toOfficeId);
  //     setToOffice(to);
  //   }
  //   if (response?.data?.busId) {
  //     await handleGetBusById(response?.data?.busId);
  //   }
  // };

  const handleGetOfficeById = async (officeId) => {
    const response = await getOffice(officeId);
    return response?.data?.data;
  };

  const handleGetBusById = async (busId) => {
    const response = await getBusById(busId);
    setBus(response?.data);
  };

  const handleGetAllOrder = async () => {
    getOrders(1, 10, "").then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        console.log(res.data?.items?.filter((item) => item.packageId == id));
        setOrders(
          res.data?.items?.filter((item) => item.packageId == id) || []
        );
      }
    });
  };

  // {
  //   id: 3,
  //   packageId: 3,
  //   image: ' ... (length: 441284)',
  //   weight: 0.4,
  //   price: 400000,
  //   note: ' ... (length: 21)',
  //   contact: ' ... (length: 10)'
  // },

  useEffect(() => {
    getPackageById(id)
      .then((res) => {
        console.log(res?.data);

        setPackageData(res?.data);
        return res?.data;
      })
      .then((res) => {
        handleGetOfficeById(res?.fromOfficeId).then((res) => {
          setFromOffice(res);
        });
        handleGetOfficeById(res?.toOfficeId).then((res) => {
          setToOffice(res);
        });
        console.log(res);
        getBusById(res?.busId)
          .then((resData) => {
            console.log(resData);
            setBus(resData?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        getOrders(1, 100).then((res) => {
          if (res.error) {
            console.log(res.error);
          } else {
            console.log(id)
            console.log(res.data?.items);
            console.log(res.data?.items?.filter((item) => item.packageId == id));
            setOrders(
              res.data?.items?.filter((item) => item.packageId == id) || []
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(orders);

  console.log(order);

  return (
    <div className="w-full px-6 pt-6">
      <div>
        <div
          onClick={handleClick}
          className="flex items-center gap-2 w-fit p-4 cursor-pointer"
        >
          <div>
            <img src={List} alt="icon" className="h-16 w-16" />
          </div>
          <button>Quay lại</button>
        </div>
      </div>
      {packageData == null ? (
        <div>Không tìm thấy đơn hàng</div>
      ) : (
        <div className=" w-full p-6 bg-[#eaf4fa] grid grid-cols-3 gap-6 rounded-md">
          <div className="col-span-1 space-y-4">
            <div className="flex justify-center items-center p-6 bg-white max-h-56 object-cover rounded-md">
              {/* base 64 image */}
              <di className="overflow-hidden h-48">
                <img
                  src={
                    `data:image/png;base64, ` + packageData?.image || orderImage
                  }
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </di>
            </div>
            <div className="w-full">
              <div className="flex justify-center  gap-2 text-sm font-bold px-20">
                <div className="">
                  {
                    packageData?.status === 1 && "✅" || packageData?.status === 0 && "⏳" || packageData?.status === -1 && "✅" || "⏳"
                  }
                </div>
                <span className="flex-1">Proccessing</span>
              </div>
              <div className="text-sm font-semibold col-span-1 text-left flex gap-2 items-center mr-12 px-20 ml-2">
              |
              </div>
              <div className="flex justify-center gap-2 text-sm font-bold px-20">
                <div className="">
                  {
                    packageData?.status === 1 && "✅" || packageData?.status === 0 && "⏳" || packageData?.status === -1 && "❌" || "⏳"
                  }
                </div>
                <span className="flex-1">
                  {
                    packageData?.status === 1 && "Done" || packageData?.status === 0 && "Waiting" || packageData?.status === -1 && "Cancel" || "Waiting"
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-3 relative">
            <div className="font-semibold text-lg  text-[#50a4b8]">
              Mã package: {packageData?.id}
            </div>
            <div className="font-semibold text-sm col-span-1 truncate">
              Khối lượng:{" "}
              <span className="text-sm font-normal">
                {packageData?.totalWeight} kg
              </span>
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
              <span className="text-sm font-normal truncate">
                {toOffice?.name}
              </span>
            </div>
            <div className="font-semibold text-sm">
              Thời gian đặt:{" "}
              <span className="text-sm font-normal truncate">
                {packageData?.createTime}
              </span>
            </div>
            <div className="font-semibold text-sm">
              Ghi chú:{" "}
              <span className="text-sm font-normal truncate">
                {packageData?.note}
              </span>
            </div>
            <div className="font-semibold text-sm">
              Số lượng sản phẩm:{" "}
              <span className="text-sm font-normal truncate">
                {packageData?.quantity}
              </span>
            </div>
            <div className="font-semibold text-sm">
              Bus:{" "}
              <span className="text-sm font-normal truncate">{bus?.name}</span>
            </div>
            <div className="absolute bottom-0 right-0 flex flex-col items-center justify-center gap-3">
            {packageData?.status === 1 ? (
          <div className="row-span-1 flex justify-center font-bold items-center text-base text-green-500 bg-green-200 border-2  w-full rounded-full h-10">
            Đã xử lý
          </div>
        ) : (
          <>
            {packageData?.status === 0 ? (
              <div className="row-span-1 flex justify-center font-bold items-center text-base text-gray-500 bg-gray-200 border-2  w-full rounded-full h-10">
                Đang xử lí
              </div>
            ) : (
              <>
                {packageData?.status === 4 ? (
                  <div className="row-span-1 flex justify-center font-bold items-center text-base text-red-500 bg-red-200 border-2  w-full rounded-full h-10">
                    Đã xóa
                  </div>
                ) : (
                  <>
                    {packageData?.status === 5 ? (
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
              <div className="row-span-1 text-lg font-semibold text-red-500">
                Tổng tiền: {formatPrice(packageData?.totalPrice || 0)}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
