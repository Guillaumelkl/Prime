
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
    <h3 className='loginMsg'> The start of your new journey as a developer</h3>
      <div className='loginCard'>
          <h4 className='login'>Welcome to DevHub </h4>
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-outline form-white mb-4'>
                <MDBInput 
                wrapperClass='mb-4' 
                label='Email address' 
                id='form2' 
                type='email' 
                class="form-control" 
                {...register("email", { required: "Email is required." })}
                 />
                {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
                {errors.email && errors.email.type === "pattern" && (
                  <p className='errorMsg'>Invalid email address format</p>
                )}
                </div>
                <div className='form-outline form-white mb-4'>
                <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='form2'
                type="password" 
                class="form-control" 
              
              name='password'
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
                 })}/>
                 </div>
                <MDBBtn className="mb-4 w-100" type="submit">Log in</MDBBtn>
              </form>
            </MDBCardBody>
          
      </div>
    
    </div>
  );
}

export default LoginForm;

