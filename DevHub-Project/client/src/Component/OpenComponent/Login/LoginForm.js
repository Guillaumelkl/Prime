
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { useForm } from "react-hook-form";
import DataLogin from './LoginData';
import { useNavigate } from "react-router-dom";
import "./login.css";

function LoginForm(props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    reset({
      email: "",
      password: "",
    });

    const result = await DataLogin(data);
    if (result) {
      props.onLogin(true);
      navigate("/home");
    }
  }

  return (
    <div className='loginContainer' >
    <MDBContainer className='my-5'>
      <MDBCard className='loginCard'>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>
          <MDBCol md='8'>
          <h4 className='login'>Welcome to DevHub </h4>
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' 
                {...register("email", { required: "Email is required." })} />
                {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
                {errors.email && errors.email.type === "pattern" && (
                  <p className='errorMsg'>Invalid email address format</p>
                )}

                <MDBInput wrapperClass='mb-4' label='Password' id='form2'type="password" 
              class="form-control" 
              
              name='password'
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
                 })}/>

                <MDBBtn className="mb-4 w-100" type="submit">Log in</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    </div>
  );
}

export default LoginForm;
