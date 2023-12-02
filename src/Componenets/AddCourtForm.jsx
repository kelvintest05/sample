import React, { useState } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import AxiosInstance from '../Config/AxiosInstance';
import { toastError, toastSucces } from '../Constants/plugins';
import { useNavigate } from 'react-router-dom';

export default function AddCourtForm() {
  const [formValue, setFormValue] = useState({
    courtName: '',
    location: '',
    address: '',
    type: '',
  });
  const navigate=useNavigate()
  const [courtPicture,setCourtPicture]=useState(null)
  const [selectedImage,setSelectedImage]=useState('')

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
  const addFileData =(e)=>{
    setCourtPicture(e.target.files[0])
    e.target?.files[0]? setSelectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null):setSelectedImage(null)
  }
const addCourtData =()=>{
  console.log(formValue.courtPicture);
let fileData=new FormData()
fileData.append('image',courtPicture)

  AxiosInstance.post('/admin/addCourtData',fileData,{params:formValue},{headers:{"Content-Type": 'multipart/form-data'}}).then((response)=>{
toastSucces('new court added ')
navigate('/home')

  })
  .catch(err=>{
    toastError('some thing went wrong')
  })
}
  return (
    <MDBValidation className='row g-3 mt-5'>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.fname}
          name='courtName'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Court Name'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.lname}
          name='location'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Location'
        />
      </MDBValidationItem>
      <MDBValidationItem   className='col-md-4'>
        <MDBInputGroup >
          <input
          name='type'
            type='text'
            onChange={onChange}
            className='form-control'
            id='validationCustomUsername'
            placeholder='Type'
            required
          />
        </MDBInputGroup>
      </MDBValidationItem>
      <MDBValidationItem className='col-12' feedback='Please provide a valid city.' invalid>
        <textarea
          value={formValue.city}
          name='address'
          onChange={onChange}
          id='validationCustom03'
          required
          label='address'
          className='w-100'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-12 col-md-5' >
        <MDBInput
        type='file'
          name='courtPicture'
          onChange={addFileData}
          id='validationCustom05'
          required
          label='court picture'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-12' feedback='You must agree before submitting.' invalid>
        <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck' required />
      </MDBValidationItem>
      {selectedImage && <img src={selectedImage} alt="" className='object-fit w-25 ml-5'/>}
      <div className='col-12 '>
        <MDBBtn type='submit' onClick={addCourtData}>Submit form</MDBBtn>
        <MDBBtn type='reset ' className='mx-3'>Reset form</MDBBtn>
      </div>
    </MDBValidation>
  );
}