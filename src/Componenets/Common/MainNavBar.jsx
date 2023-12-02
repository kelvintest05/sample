import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MainNavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const {userDetails}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const doLogout=()=>{
    // localStorage.remove('token')
    // localStorage.remove('user')
    localStorage.clear()
    navigate('/')
  }

  return (
    <MDBNavbar expand='lg' dark bgColor='primary'>
    <MDBContainer fluid>
      <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

      <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setOpenBasic(!openBasic)}
      >
        <MDBIcon icon='bars' fas />
      </MDBNavbarToggler>

      <MDBCollapse navbar open={openBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
        <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink>

            </MDBNavbarItem>


     {   userDetails.role===1 &&    <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/addNewCourt'>
                AddNewCourt
              </MDBNavbarLink>
            </MDBNavbarItem>}
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/mybookings'>
                My Bookings
              </MDBNavbarLink>
            </MDBNavbarItem>


            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
        </MDBNavbarNav>

        <form className='d-flex input-group w-auto mx-auto'>
          <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
          <MDBBtn color='primary'>Search</MDBBtn>
        </form>

        <div className='d-none d-lg-block'> {/* Display on large screens only */}
          <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link ms-2' role='button'>
                {userDetails.fname} {userDetails.lname}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link  onClick={doLogout} >Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
        </div>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  );
}