import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/constants';

export default function MybookingCard({bookingData}) {
  return (
    <MDBCard>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`${BASE_URL}/courts/${bookingData.courtData?.courtPic}`} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{bookingData.courtData?.courtName}</MDBCardTitle>
        <MDBCardText>
   {bookingData.slot?.name}
        </MDBCardText>
        <MDBCardText>
   {bookingData.date}
        </MDBCardText>
        <MDBCardText>
   {bookingData.courtData?.location}
        </MDBCardText>
        <MDBCardText>
   {bookingData.courtData?.address}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}