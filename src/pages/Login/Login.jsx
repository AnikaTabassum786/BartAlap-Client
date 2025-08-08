import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { signInUser } = useAuth()

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/'

  const onSubmit = (data) => {
   toast.success('Login Successfully!', { position: 'top-right' });

    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        navigate('/')
      })
      .catch(error => console.log(error))
  }
  return (
    <div>
      <div className="hero h-[80vh] ">
        <div className=" card bg-base-100 w-full max-w-sm  shadow-2xl">
          <p className='text-xl text-start pt-2 px-6 font-semibold'>Login</p>
          <div className="flex justify-center  card-body">
            <form onSubmit={handleSubmit(onSubmit)}
            //onSubmit={handleSubmit}
            >
              <fieldset className='fieldset'>
                <label className="label">Email</label>

                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                {
                  errors.email?.type === 'required' && (
                    <p className='text-red-500'>Email is Required</p>
                  )
                }

                <label className="label">Password</label>
                <input type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                  className="input" placeholder="Password" />
                {
                  errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                }
                {
                  errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                }

                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4 w-full">Login</button>
              </fieldset>
            </form>

            <SocialLogin></SocialLogin>

            <div>
              <p>Don't Account? Please <Link to={'/register'} className='font-semibold text-blue-500 hover:underline'>Register</Link> </p>
            </div>
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default Login;