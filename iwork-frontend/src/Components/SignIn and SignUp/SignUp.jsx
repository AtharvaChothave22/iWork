import React from 'react';
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBLink,
  CDBMask,
  CDBCheckbox,
  CDBBtn,
  CDBContainer,
} from 'cdbreact';

const SignUp = () => {
  return (
    <CDBContainer>
      <CDBCard
        style={{
          width: '30rem',
          background:
            'url(https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJh)',
          backgroundSize: 'cover',
        }}
      >
        <CDBMask overlay="darkStrong" className="flex-center" />
        <CDBCardBody className="mx-4" style={{ zIndex: '2' }}>
          <div className="text-center mt-5 mb-2">
            <p className="h4 font-weight-bold text-white"> Sign up </p>
          </div>
          <CDBInput material label="E-mail" type="email" />
          <CDBInput material label="Password" type="password" />
          <div className="d-flex mt-3 align-items-center justify-content-center">
            <CDBCheckbox />
            <p className="text-white mb-0 ms-2">
              Accept the{' '}
              <CDBLink className="d-inline p-0" to="#">
                terms and conditions
              </CDBLink>
            </p>
          </div>
          <CDBBtn color="primary" className="btn-block mx-0 my-4">
            Sign up
          </CDBBtn>
          <p className="text-white text-center mb-5">
            Have an account?{' '}
            <CDBLink className="d-inline p-0" to="#">
              Log in
            </CDBLink>
          </p>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
export default SignUp;