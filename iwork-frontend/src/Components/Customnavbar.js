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
import Category from './Category';

export default function Customnavbar() {
  const [openBasic, setOpenBasic] = useState(false);

  return (<>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid >
        <MDBNavbarBrand href='#' style={{paddingRight:"75px",paddingLeft:"20px",fontWeight:"bolder",color:"#ff1d58"}}>iWork</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
              <form className='d-flex input-group' >
            <input type='search'   className='form-control' placeholder='Find Freelancer' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0' style={{paddingLeft:"60%"}}>
            
            <MDBNavbarItem>
              <MDBNavbarLink active href='/signin' >SignIn</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
            <MDBNavbarLink active href='/signup'>SignUp</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

        
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <hr style={{marginTop:"0"}}></hr>
    <Category/> 
    </>
  );
}