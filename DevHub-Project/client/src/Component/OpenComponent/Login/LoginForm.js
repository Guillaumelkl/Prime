import { useForm} from "react-hook-form";
import DataLogin from './LoginData'
import { useNavigate } from "react-router-dom";


function LoginForm(props) {
   const {register, handleSubmit, reset, formState: {errors}} = useForm();
   const navigate = useNavigate();
   

   const onSubmit = async (data) =>{
    reset({
      email: "",
      password: "",
    });

    const result = await DataLogin(data);
    if (result){
      props.onLogin(true)
      navigate("/home");
    }
   }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form'>
     <div class="form-group">
     <h4>Sign In</h4>
     <br/>
    <label >Email :</label>
    <input type="email" class="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp" 
    placeholder="Enter email"
    name='email'
    {...register("email", {
      required: "Email is required.",
    })}
    />
    {errors.email && <p className='errorMsg'>{errors.email.message}</p>}
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <br/>
  <div className='form' class="form-group">
    <label>Password :</label>
    <input type="password" 
    class="form-control" 
    id="exampleInputPassword1" 
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
            <p className='errorMsg'>{errors.password.message}</p>
          )}
    <small id="emailHelp" class="form-text text-muted">Please never share your password with anyone else.</small>
  </div>
 <br/>
  <button className='form' type="submit" class="btn btn-primary">Submit</button>

  </div>
</form>

    </div>
  )
}

export default LoginForm