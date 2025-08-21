import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxios from '../hooks/useAxios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

     const [user,setUser] = useState(null)
     const [loading, setLoading] = useState(true)
     const axiosInstance = useAxios()


      const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

     const updateUserProfile = profileInfo =>{
        return updateProfile(auth.currentUser,profileInfo)
    } 

    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

     const logOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }

       useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            // console.log("Current User Inside", currentUser)
            setUser(currentUser)

            //  if (currentUser?.email) {
            //     axiosInstance.post(`http://localhost:3000/jwt`, {
            //         email: currentUser?.email
            //     })
            //         .then(res => {
            //             console.log(res.data)
            //             localStorage.setItem('token', res.data.token)
            //         })
            // }

            if (currentUser?.email) {
                const userData = { email: currentUser.email }
                axiosInstance.post('http://localhost:3000/jwt',userData,{withCredentials:true})
                .then(res=>{
                    console.log(res.data)
                })
                .catch(error=>console.log(error))
            }
            setLoading(false)
        })

        return()=>{
            unSubscribe()
        }
    },[axiosInstance])

     useEffect(()=>{
     if(user){
        setLoading(false)
     }
    },[user])

    const userInfo={
        createUser,
        signInUser,
        user,
        setUser,
        loading,
        setLoading,
        logOutUser,
        updateUserProfile,
        signInWithGoogle
    }
    return (
        <AuthContext value={userInfo}>
           {children}
        </AuthContext>
    );
};

export default AuthProvider;