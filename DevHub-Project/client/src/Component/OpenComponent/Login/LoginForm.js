import { useForm} from "react-hook-form";
import DataLogin from './LoginData'
import { useNavigation } from "react-router-dom";

function LoginForm(props) {
   const {register, handleSubmit, reset, formState: {errors}} = useForm();
   

   const onSubmit = async (data) =>{
    reset({
      emailOrUsername: "",
      password: "",
    });

    const response = await DataLogin(data);
    if (response){
      props.onLogin(true)
      
    }
   }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
     <div className='form' class="form-group">
    <label for="exampleInputEmail1">Email or Username</label>
    <input type="string" class="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp" 
    placeholder="Enter email or password"
    name='email'
    />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <br/>
  <div className='form' class="form-group">
    <label for="exampleInputPassword1">Password</label>
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
</form>

    </div>
  )
}

export default LoginForm