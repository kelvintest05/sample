import React, { useState } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import './Css/Login.css'
import LoginBox from '../Componenets/LoginBox';
import SignUpBox from '../Componenets/SignUpBox';
import ToastContainter from '../Componenets/Common/ToastContainter';

const  Login=()=> {
  const [boxName,setBoxName]=useState('login')

    return (<>
       <ToastContainter/>
      <div className='background-radial-gradient  login-page' style={{minHeight:'100vh'}}>
  
      <MDBContainer fluid className='p-4 background-radial-gradient min-vh-100 ' >
  
        <MDBRow>
  
          <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center align-items-center'>
  
            <h1 className=" display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
              The best offer <br />
              <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
            </h1>
  
            <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero
              veritatis? Dicta facilis sint aliquid ipsum atque?
            </p>
  
          </MDBCol>

{ boxName==='login'  && <LoginBox setBoxName={setBoxName} />}
{ boxName==='signup' && <SignUpBox setBoxName={setBoxName}/>}
          <MDBCol md="1"></MDBCol>
  
        </MDBRow>
  
      </MDBContainer>
      </div>
      </>
    )
}

export default Login