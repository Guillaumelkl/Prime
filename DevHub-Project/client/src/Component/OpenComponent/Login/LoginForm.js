// import { useForm} from "react-hook-form";
// import DataLogin from './LoginData'
// import { useNavigate } from "react-router-dom";
// import "./login.css"

// function LoginForm(props) {
//    const {register, handleSubmit, reset, formState: {errors}} = useForm();
//    const navigate = useNavigate();
   

//    const onSubmit = async (data) =>{
//     reset({
//       email: "",
//       password: "",
//     });

//     const result = await DataLogin(data);
//     if (result){
//       props.onLogin(true)
//       navigate("/home");
//     }
//    }


//   return (
//     <div className="test">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='loginForm' >
//           <div   class="form-group">
//             <h4>Sign In</h4>
//             <br/>
//             <label>Email :</label>
//             <input type="email" class="form-control" 
//               id="exampleInputEmail1" 
//               aria-describedby="emailHelp" 
//               placeholder="Enter email"
//               name='email'
//               {...register("email", {
//                 required: "Email is required.",
//               })}
//             />
//             {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
//             {errors.email && errors.email.type === "pattern" && (
//               <p className='errorMsg'>Invalid email address format</p>
//             )}
//             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

//             <div className='form' class="form-group">
//             <label>Password :</label>
//             <input type="password" 
//               class="form-control" 
//               id="exampleInputPassword1" 
//               placeholder="Password"
//               name='password'
//               {...register("password", {
//                 required: "Password is required.",
//                 minLength: {
//                   value: 6,
//                   message: "Password should be at-least 6 characters.",
//                 },
//               })}
//             />
//             {errors.password && (
//               <p className='errorMsg'>{errors.password.message}</p>
//             )}
//             <small id="emailHelp" class="form-text text-muted">Please never share your password with anyone else.</small>
//             <br/>
//             <br/>
//             <button id="btnLogin" className='form' type="submit" class="btn btn-primary">Submit</button>
//           </div>
//           </div>
//           </div> 
//       </form>
//     </div>
//   )
// }

// export default LoginForm;


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
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>
          <MDBCol md='8'>
          <h4 className='login'>Log In</h4>
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

                <MDBBtn className="mb-4 w-100" type="submit">Sign in</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginForm;
