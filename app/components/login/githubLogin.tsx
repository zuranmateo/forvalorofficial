import React from 'react'
import { signIn } from '@/auth';

const GithubLogin = () => {
  return (
    <>
    <form action={ async() => {
        "use server"
        await signIn("github")}
      }>
      <button type='submit' className='github-login-button'>
        Login with Github
      </button>
    </form>
    </>
    
  )
}

export default GithubLogin