import List from "@/assets/icon/back.svg";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OfficeCardDetails from '../components/OfficeCardDetails';
import { OFFICES } from '../components/mock-data';
import { getOffice } from "../../../../lib/api/office-api";

export default function OfficeDetails() {
    const navigate = useNavigate();
    const { id } = useParams()

    function handleClick() {
        navigate(-1)
    }
    const [office, setRoute] = useState({})

    useEffect(() => {
        const init = async () => {
            getOffice(id)
            .then((res) => {
                if(res.error){
                    console.log(res.error)
                }else{
                    console.log(res.data)
                    setRoute(res.data?.data || {})
                }
            })
        }
        init()
    }, [id])



  return (
    <div>
        <div onClick={handleClick} className='flex items-center gap-2 w-fit p-4 cursor-pointer'>
            <div>
                <img src={List} alt="icon" className="h-16 w-16" />
            </div>
            <button>Quay lại</button>
        </div>
        <OfficeCardDetails office={office}/>
    </div>
  )
}
