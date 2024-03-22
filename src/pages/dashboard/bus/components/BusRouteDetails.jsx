import BusIcon from "@/assets/icon/bus-circle.svg";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import React, { useEffect, useState } from "react";
import { getOffice } from "../../../../lib/api/office-api";
import { useNavigate } from "react-router-dom";
import HoverStation from "./HoverStation";
export default function BusRouteDetails({ route }) {
  const navigate = useNavigate()
  // id: 1375,
  //   name: 'Vinhomes Grand Park - Bến xe buýt Sài Gòn',
  //   description:
  //     'Vinhomes Grand Park - đường Nguyễn Xiển - đường Nguyễn Văn Tăng - đường Lê Văn Việt - đường D2B – đường D2 - đường Võ Chí Công đường Liên Phường - Đường Đỗ Xuân Hợp - đường dẫn Cao tốc (thành phố Hồ Chí Minh – Long Thành – Dầu Giây) - đường Mai Chí Thọ - đường Đồng Văn Cống - đường Phan Văn Đáng - đường Trương Văn Bang - đường Bát Nàn - đường Trần Quý Kiên - đường Mai Chí Thọ - Hầm vượt sông Sài Gòn - đường Võ Văn Kiệt - đường Ký Con - đường Nguyễn Công Trứ - đường Pasteur - đường Hàm Nghi - đường Lê Lai - Bến xe buýt Sài Gòn',
  //   isActive: true,
  //   startPoint: 'Vinhomes Grand Park',
  //   endPoint: 'Bến xe buýt Sài Gòn',
  //   operateTime: '05:00 - 19:00',

  console.log(route);
  return (
    <div className="rounded-xl bg-[#F2F8FB] p-4 px-20 flex items-center gap-4 pt-0 pb-52">
      {route != null && (
        <>
          <div>
            <img src={BusIcon} alt="icon" className="h-52 w-52" />
          </div>
          <div className="flex-1 flex flex-col self-start ml-10 gap-10 pt-52">
            <span className="font-bold text-[#4BA2B6] text-3xl">
              {route.name}
            </span>
            <span className="text-2xl">
              <b>Từ trạm: </b> {route?.startPoint}
            </span>
            <span className="text-2xl">
              <b>Đến trạm: </b> {route?.endPoint}
            </span>
            <span className="text-2xl">
              <b>Thời gian bắt đầu: </b> {route?.operateTime?.split("-")[0]}
            </span>
            <span className="text-2xl">
              <b>Thời gian kết thúc: </b> {route?.operateTime?.split("-")[1]}
            </span>

            <span className="flex gap-4">
              <b>Trạm:</b>{" "}
              {route?.stations?.length != 0 ? (
                <>
                  {route?.stations?.map((station, index) => {
                    

                    return(
                      <HoverStation key={index} station={station} />
                    )
                  })}
                </>
              ) : (
                "Không có trạm nào"
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
