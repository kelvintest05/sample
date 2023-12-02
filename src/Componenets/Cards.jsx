import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCardSubTitle
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';

export default function Cards({data}) {
const navigate=useNavigate()
  return (
    <MDBCard style={{width:'18rem'}}  className='col-12 col-md-3 col-lg-4  col-xl-2 col-xxl-1 ' onClick={()=>navigate(`/courtUserViewPage/${data._id}`)} >
      <MDBCardImage src={`${BASE_URL}/courts/${data.courtPic}`} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{data?.courtName}e</MDBCardTitle>
        <MDBCardSubTitle>{data.type}</MDBCardSubTitle>
        <MDBCardSubTitle>{data.location}</MDBCardSubTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}