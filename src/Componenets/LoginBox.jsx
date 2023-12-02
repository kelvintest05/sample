import React, { useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import axios from 'axios'
import { BASE_URL } from '../Constants/constants'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSucces } from '../Constants/plugins'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails, setUserRole } from '../Toolkit/userSlice'



function LoginBox({setBoxName}) {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const navigate=useNavigate()
const {userDetails,userRole}=useSelector((state)=>state.user)
const dispatch=useDispatch()


const handleSignUp=()=>{
    setBoxName('signup')
}
const handleLogin =()=>{
  try {
    
  if(email&& password){
    axios.post(`${BASE_URL}/auth/login`,{email,password}).then((res)=>{
    if(res.data.message==="login successfull" && res.data.token){
localStorage.setItem('token',res.data.token)
const parsedToken=parseJwt(res.data.token)
localStorage.setItem('user',JSON.stringify(parsedToken))
dispatch(setUserDetails(parsedToken))
toastSucces('login successfull')
navigate('/home')

    }

    if(res.data.message==="invalid credentials"){
      toastError("invalid credentials");
    }
    })
  }else{
    alert('credentials not filled')
  }
}
  catch (error) {
    
  }
}
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const updateUserRole=()=>{
dispatch(setUserRole(123))
}
  return (
    <MDBCol md='4' className='position-relative'>
   
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBInput wrapperClass='mb-2' label='Email' id='form3' type='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-2' label='Password' id='form4' type='password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <button className='w-100 mb-4 btn btn-primary border rounded-2' size='md' onClick={handleLogin}>Login</button>

              <div className="text-center">

                <p>dont have an account <span onClick={handleSignUp}>Register here </span></p>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
  )
}

export default LoginBox
