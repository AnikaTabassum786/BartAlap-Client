import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';
import SocialLogin from '../SocialLogin/SocialLogin';
import { auth } from '../../firebase/firebase.init';
import { reload } from 'firebase/auth';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile,setUser } = useAuth()
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'

    const onSubmit = (data) => {
        // console.log(data)
        // console.log(createUser)
        createUser(data.email, data.password, data.name)
            .then(async (result) => {
                console.log(result.user)

                //update userInfo in the database

                const userInfo = {
                    email: data.email,
                    name: data.name,
                    image: profilePic,
                    role: 'user',
                    badge: 'bronze',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo)
                // console.log(userRes.data)
                 toast.success('Register  Successfully!', { position: 'top-right' });



                //update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic

                }

                // updateUserProfile(userProfile)
                //     .then(() => {
                //         console.log('Profile name pic updated')
                //         navigate(from)
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     })

                await updateUserProfile(userProfile);
                await reload(auth.currentUser);       // reload user from Firebase
                setUser(auth.currentUser);            // update context
                navigate(from);

            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        // console.log(image)


        const formData = new FormData();
        formData.append('image', image)

        const imgUploadURL = 'https://api.imgbb.com/1/upload?key=511e2e9caf8cd644a8bf5628230588f6'

        const res = await axios.post(imgUploadURL, formData)
        // console.log(res.data.data.url)

        setProfilePic(res.data.data.url)
    }
    return (
        <div>


            <div className="hero-content flex-col  lg:flex-row-reverse h-[120vh]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <p className='text-xl text-start pt-2 px-6 font-semibold'>Registration</p>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}
                        // onSubmit={handleSubmit}
                        >

                            <fieldset className="fieldset">
                                <label className="label">Name</label>

                                <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />

                                {
                                    errors.name?.type === 'required' && (
                                        <p className='text-red-500'>Name is Required</p>
                                    )
                                }
                                <label className="label">Your image</label>
                                <input
                                    type="file"
                                    {...register('image', { required: true })}
                                    onChange={handleImageUpload}
                                    className="input"
                                />

                                {
                                    errors.image?.type === 'required' && (
                                        <p className='text-red-500'>Image is required</p>
                                    )
                                }

                                

                                <label className="label  mt-2">Email</label>
                                

                                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                                {
                                    errors.email?.type === 'required' && (
                                        <p className='text-red-500'>Email is Required</p>
                                    )
                                }
                                <label className="label mt-4 ">Password</label>
                                <input type="password"
                                    {...register('password', { required: true, minLength: 6 })}
                                    className="input" placeholder="Password" />
                                {
                                    errors.password?.type === 'required' && (
                                        <p className='text-red-500'>Password is Required</p>
                                    )
                                }
                                {
                                    errors.password?.type === 'minLength' && (
                                        <p className='text-red-500'>Password Must be 6 characters or longer</p>

                                    )
                                }


                                <div ><button className="btn btn-neutral mt-4 text-white w-full">Register</button></div>
                            </fieldset>


                        </form>


                        <SocialLogin></SocialLogin>

                        <div>
                            <p>Already registered?   Please <Link to={'/login'} className='font-semibold text-blue-500 hover:underline'>Login</Link> </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;