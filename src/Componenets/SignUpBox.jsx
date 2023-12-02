
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Constants/constants';


function SignUpBox({setBoxName}) {

const handleLogin=()=>{
  console.log(' fn called');
    setBoxName('login')
}

const [signUpData, setSignUpData]=useState(
  {
  fName:'',
  lName:'',
  email:'',
  password:'',
  confPass:'',
}
)

const handleRegister=()=>{
  try {
    axios.post(`${BASE_URL}/auth/signup`,signUpData).then((res)=>{
if(res.data.meassage==="signup successfull"){
  setBoxName('login')
}
if(res.data.meassage==="email already exist"){
 alert('email already exist')
}
 
    })
  } catch (error) {
    
  }

}


  return (
    <MDBCol md='4' className='position-relative'>
    <MDBCard className='my-5 bg-glass'>
      <MDBCardBody className='p-5'>
        <MDBRow>
          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-2' label='First name' id='form1' type='text' value={signUpData.fName} onChange={(e)=>{setSignUpData({...signUpData,fName:e.target.value})}}/>
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-2' label='Last name' id='form2' type='text' onChange={(e)=>{setSignUpData({...signUpData,lName:e.target.value})}} />
          </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-2' label='Email' id='form3'  type='email' onChange={(e)=>{setSignUpData({...signUpData,email:e.target.value})}} />
        <MDBInput wrapperClass='mb-2' label='Password' id='form4' type='password' onChange={(e)=>{setSignUpData({...signUpData,password:e.target.value})}} />
        <MDBInput wrapperClass='mb-2' label='confirm Password' id='form4' type='password' onChange={(e)=>{setSignUpData({...signUpData,confPass:e.target.value})}} />

        <div className='d-flex justify-content-center mb-4'>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
        </div>

        <button className='w-100 mb-4 rounded-1 p-1 btn btn-primary' size='md' onClick={handleRegister} >sign up</button>

        <div className="text-center cursor-pointer font-italic" ><i onClick={()=>{handleLogin()}}>go to Login</i> 
        </div>

      </MDBCardBody>
    </MDBCard>

  </MDBCol>
  )
}

export default SignUpBox