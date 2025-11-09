import React from 'react'
import GithubLogin from './login/githubLogin'
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';


const LoginForm = async () => {
  const session = await auth();
  
  return (
    <>
      {session && session?.user ? (
        redirect("./")
      ):(
        
        <div>
        <form action={ async() => {
          "use server"
          await signIn("github")}
        }>
        <button type='submit' className='github-login-button'>
          Login with Github
        </button>
      </form>
      </div>
      )
    }
    </>
  )
}

export default LoginForm