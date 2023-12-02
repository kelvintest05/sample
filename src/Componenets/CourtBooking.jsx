import React, { useEffect, useState } from "react";
import "./Css/CourtBooking.css";
import { ModalView } from "./Common/Modal";
import { useParams } from "react-router-dom";
import AxiosInstance from "../Config/AxiosInstance";
import { BASE_URL, TIMINGS } from "../Constants/constants";
import { toastError, toastSucces } from "../Constants/plugins";
import { useSelector } from "react-redux";

function CourtBooking() {
  const { id } = useParams();
  const [singleCourtData, setSingleCourtData] = useState({});
  const [modalOpen, setModalOpen] = useState();
  const [timeSlotData, setTimeSlotData] = useState({
    startDate: "",
    endDate: "",
    cost:null
  });
  const [showdDropDown, setShowdDropDown] = useState(false);
  const [selectedTimings, setSelelctedTimings] = useState([]);
  const [filterTimigs, setFilterTimings] = useState(TIMINGS);
  const [slotData,setSlotData]=useState([]);
  const [inputDate,setInputDate]=useState();
  const [bookingModal,setBookingModal]=useState(false)
  const [selectedSlot,setSelectedSlot]=useState(null)
  const {userDetails}=useSelector(state=>state.user)
  useEffect(() => {
    getSinglecourtData();
    getTimeSlotData(new Date())
  }, []);

  useEffect(() => {
    getLatestFilterSlots();
  }, [selectedTimings]);
  const getSinglecourtData = () => {
    AxiosInstance.get("/users/getSinglecourtData", { params: { courtId: id } })
      .then((res) => {
        setSingleCourtData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setTimeSlotData({ ...timeSlotData, [e.target.name]: e.target.value });

  };
  const getLatestFilterSlots = () => {
    if (selectedTimings.length === 0) {
      setFilterTimings(TIMINGS);
    } else {
      const tempArray=[]
      for (let slot of TIMINGS) {
        let flag = false;
        for (let Sslot of selectedTimings) {
          if (slot.id === Sslot.id) {
            flag = true;
          }
        }

        if (!flag) {
          tempArray.push(slot)
        }
      }
      setFilterTimings(tempArray)
    }

  };
  const handleCreateTimeSlot =()=>{
    try {
      AxiosInstance.post('/admin/addTimeSlotData',{...timeSlotData,selectedTimings, courtId:id}).then((res)=>{
        setModalOpen(false)
        toastSucces('court slots added successfully')
       
      })
    } catch (err) {
      toastError('something went wrong')
    }
  }

  const getTimeSlotData=(date=new Date())=>{
AxiosInstance.get('/users/dayWiseTimeSlot',{params:{courtId:id, date:date}}).then((res)=>{
setSlotData(res.data)
})
.catch((err)=>{
  debugger
})
  }

  const initiateBooking =async ()=>{
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await AxiosInstance.post("/payment/orders",{slotId:selectedSlot._id});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_RmJEvDzXfqDrXm", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "bookMy court",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              slotId:selectedSlot._id
          };

          const result = await AxiosInstance.post("/payment/success", data);

          toastSucces(result.data.msg);
          setBookingModal(false)
          getTimeSlotData(new Date(inputDate))
      },
      prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  return (
    <>
      <div className="single-court-img-box">
        <img src={`${BASE_URL}/courts/${singleCourtData?.courtPic}`} alt="" />
        <div className="court-name">
          <h3>{singleCourtData.courtName}</h3>
       { userDetails.role===1 &&  <button onClick={() => setModalOpen(true)}>add Time slot </button>}
        </div>
      </div>
      <div className="d-flex">
        <marquee
          behavior="scroll"
          direction="right"
          className="rolling-booking"
        >
          <h3 className="d-inline">Confirm your slots at the earliest</h3>
        </marquee>
      </div>

      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className=" col-md-6 col-lg-3 col-12 border border-1 rounded-2">
            <div className="date-picker">
              <span>Today</span>
              <span>Tommorrow</span>
              <div>
              <input type="date" placeholder="select a  specific Date" value={inputDate} onChange={(e)=>setInputDate(e.target.value)} /> <button onClick={()=> inputDate && getTimeSlotData(new Date(inputDate))}>Search</button>
              </div>
             
            </div>
            <div className="slotname-container d-flex flex-wrap gx-2 gap-3 mt-5 pointer">
             { slotData.map((slot)=><span className={`border rounded-2  ${slot.bookedBy?'bg-gray ': 'bg-warning'}`} key={slot.id} onClick={()=>{ !slot.bookedBy &&setBookingModal(true); !slot.bookedBy && setSelectedSlot(slot)}}>{slot.slot.name}</span>) }
              
            </div>
            <button className="btn btn-primary  w-100 mt-5 border">
              {" "}
              Book Now{" "}
            </button>
          </div>
        </div>
      </div>

      {/* //admin  */}
      <ModalView modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="d-flex flex-column  add-court-timing-modal">
          <h3>{singleCourtData.courtName}</h3>
          <h5>{singleCourtData.location}</h5>
          <label htmlFor="">starting date</label>
          <input
            type="date"
            // min={}  // to be fetched from BE
            value={timeSlotData.startDate}
            name="startDate"
            onChange={handleChange}
          />
          <label htmlFor="">ending Date</label>
          <input
            type="date"
            min={timeSlotData.startDate}
            value={timeSlotData.endDate}
            name="endDate"
            onChange={handleChange}
          />

          <label htmlFor="">cost </label>
          <input type="number"  name='cost'  value={timeSlotData.cost} onChange={handleChange}/>
          <div
            className="cus-dropdown mt-4 d-inline"
            onClick={() => setShowdDropDown(true)}
          >
            Select Timings
            {showdDropDown && (
              <div
                className="cus-options"
                onMouseLeave={() => setShowdDropDown(false)}
              >
                <ul>
                  {filterTimigs.map((element, index) => (
                    <li
                      onClick={() =>
                        setSelelctedTimings([...selectedTimings, element])
                      }
                      key={element.id}
                    >
                      {element.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="m-2 ">
            {selectedTimings?.length > 0 ? (
              selectedTimings.map((element) => (
                <span className="border border-1 bg-warning border rounded-2 border-dark p-1 ">
                  {element.name}
                </span>
              ))
            ) : (
              <i>no slots available</i>
            )}
          </div>
        </div>
        <button className="btn-primary w-100 mt-3 bg-primary border rounded-2" onClick={handleCreateTimeSlot}>
          {" "}
          Submit
        </button>
      </ModalView>
      <ModalView modalOpen={bookingModal} setModalOpen={setBookingModal}>

<div> court name : {selectedSlot?.court?.courtName} </div>
<div>date: {new Date(selectedSlot?.date).toString().slice(0,15)} </div>
<div>slot: {selectedSlot?.slot?.name} </div>
<div>cost: {selectedSlot?.cost}</div>
<div>address: {selectedSlot?.court?.address} </div>
<button onClick={initiateBooking}>Book Now</button>

      </ModalView>
    </>
  );
}

export default CourtBooking;
