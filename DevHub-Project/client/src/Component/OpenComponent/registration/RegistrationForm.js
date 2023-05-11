import { useForm} from "react-hook-form";
import DataRegistration from './DataRegistration';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (dataUser) => {
    reset({
      firstName:"",
      lastName:"",
      userName:"",
      email: "",
      password: "",
    });
    
    await DataRegistration(dataUser);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className='registration'class="form-group">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form' >
        <h4>Sign Up</h4>
          <br/>
          <label>First Name :</label>
          <input type="string" 
          class="form-control" 
          placeholder="First Name"
          name="firstName" 
          {...register("firstName", {
            require:[true, "First name is required" ],
          })}
          />
          <br/>
          <label>Last Name :</label>
          <input 
          type="string" 
          class="form-control" 
          placeholder="Last Name"
          name="lastName"
          {...register("lastName", {
            require:[true, "Last name is required" ],
          })}
          />
          <br/>
          <label>Username :</label>
          <input type="string" 
          class="form-control" 
          placeholder="Username"
          name="userName" 
          {...register("userName", {
            require:[true, "Username name is required" ],
          })}
          />
          <br/>
          <label>Email : </label>
          <input
            type='email'
            class="form-control"
            placeholder="Password"
            name='email'
            {...register("email", {
              required: "Email is required.",
              minLength: {
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              },
            })}
          />
             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

          {errors.email && <p>{errors.email.msg}</p>}
          <br/>
          <br/>
          <label>Password : </label>
          <input
            type='password'
            class="form-control"
            placeholder="Password"
            name='password'
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password should be at-least 5 characters.",
              },
            })}
          />
          {errors.password && (
            <p>{errors.password.msg}</p>
          )}
          
              <small id="emailHelp" class="form-text text-muted">Please never share your password with anyone else.</small>
              <br/>
              <br/>
              <button type='submit' class="btn btn-primary" >Register</button>
        </div>
       

      </form>
    </div>
  );
};
  

export default RegistrationForm