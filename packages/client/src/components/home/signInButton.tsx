'use client';
import React from 'react'
import { Button } from '../ui/button';
import {signIn} from "next-auth/react"
import { toast } from 'react-hot-toast';

const SignInButton = () => {
    const loginWithGoogle = async () => {
        try{
        //   console.log("Asking for login")
            await signIn('google');
            
        }catch(e){
            toast.error('Something went wrong')
          console.error(e)
        }
      }
  return (
    <div>
        <Button onClick={loginWithGoogle} variant="secondary" size="lg">
          Sign in
        </Button>
    </div>
  )
}

export default SignInButton