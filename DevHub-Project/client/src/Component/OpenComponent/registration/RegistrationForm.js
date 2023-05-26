import { useForm } from "react-hook-form";
import DataRegistration from './DataRegistration';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./registration.css"

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
    <div class="form-group" >
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className='registration' >
          <h4>Sign Up</h4>
          <br/>
          <label>First Name:</label>
          <input 
            type="string" 
            class="form-control" 
            placeholder="First Name"
            name="firstName" 
            {...register("firstName", {
              required: "First name is required.",
            })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <br/>
          <label>Last Name:</label>
          <input 
            type="string" 
            class="form-control" 
            placeholder="Last Name"
            name="lastName"
            {...register("lastName", {
              required: "Last name is required.",
            })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <br/>
          <label>Username:</label>
          <input 
            type="string" 
            class="form-control" 
            placeholder="Username"
            name="userName" 
            {...register("userName", {
              required: "Username is required.",
            })}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <br/>
          <label>Email:</label>
          <input
            type='email'
            class="form-control"
            placeholder="Email"
            name='email'
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          <br/>
          <br/>
          <label>Password:</label>
          <input
            type='password'
            class="form-control"
            placeholder="Password"
            name='password'
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters.",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <small id="emailHelp" class="form-text text-muted">Please never share your password with anyone else.</small>
          <br/>
          <br/>
          <button type='submit' class="btn btn-primary" >Register</button>
          <br/>
          <br/>
          <ul>
          <p>You already have an account? <Link to='/login'>Login</Link></p>
          
          </ul>
          
        </div>
      </form>
    </div>
  );
};
  

export default RegistrationForm;
