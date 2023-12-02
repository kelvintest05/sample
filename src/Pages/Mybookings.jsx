import React, { useEffect, useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance'
import MybookingCard from '../Componenets/myBookingCard'

function Mybookings() {
    const [bookings,setBokkings]=useState([])
    useEffect(()=>{
        getMybookingsData()
    },[])
    const getMybookingsData=()=>{
        AxiosInstance.get('users/getMybookingsData').then((res)=>{
            setBokkings(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
    {bookings.map((booking)=><MybookingCard bookingData={booking}/>)}


    </div>
  )
}

export default Mybookings