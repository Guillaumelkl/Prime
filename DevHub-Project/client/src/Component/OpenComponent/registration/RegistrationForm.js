
import React from 'react';
import { useForm } from "react-hook-form";
import DataRegistration from './DataRegistration';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./registration.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';

const RegistrationForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (dataUser) => {
    reset({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    });

    await DataRegistration(dataUser);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className='registerContainer' >
    <MDBContainer  fluid className='p-4 background-radial-gradient overflow-hidden' >
         
      <MDBRow>
      
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 70%)'}}>
            A new way to track your projects 
            <br />
            <span style={{color: 'hsl(218, 81%, 60%)'}}>and interact with other Developers</span>
          </h1>



        </MDBCol>

        <MDBCol md='6' className='position-relative'>
        
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
            <h4>Welcome to DevHub, your new way to store and track your projects.</h4>
            <br/>
            <h5>Register</h5>
            <br/>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='First name'
                      type='text'
                      {...register("firstName", {
                        required: "First name is required.",
                      })}
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Last name'
                      id='form2'
                      type='text'
                      {...register("lastName", {
                        required: "Last name is required.",
                      })}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass='mb-4'
                  label='Username'
                  id='form3'
                  type='text'
                  name="userName" 
                  {...register("userName", {
                      required: "Username is required.",
                  })}
                />

                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='form3'
                  type='email'
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid.",
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='form4'
                  type='password'
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters.",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}


                <MDBBtn className='w-100 mb-4' size='md' type='submit'>sign up</MDBBtn>

  
              </form>
              
              <div className="text-center">
                <p>You already have an account? <Link to='/login'>Login</Link></p>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
  );
};

export default RegistrationForm;
