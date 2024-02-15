import React from 'react'
import '../Components/CSS/Category.css'
import {
  
  MDBNavbar,
 
  MDBListGroup,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';



  const Category = () => {
    

  return (
    <MDBNavbar expand='lg' light bgColor='light' style={{marginTop:"-16px"}}>
      
       
      <MDBListGroup style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
          <Link to='/' id='linkl' >
            Design & Multimedia
          </Link>
          <Link to='/'id='link' >
            Development & IT
          </Link>
          <Link to='/' id='link'  >
            Engineering & Architecture
          </Link>
          <Link to='/'id='link'  >
            Finance & Accounting
          </Link>
          <Link to='/'id='link'  >
            HR & Training
          </Link> 
          <Link to='/'id='link' >
            Photography
          </Link>
          <Link to='/'id='link' >
            Sales & Marketing
          </Link>
          
        </MDBListGroup>
        
      

       
        

        
    
    
    </MDBNavbar>
  )
}

export default Category