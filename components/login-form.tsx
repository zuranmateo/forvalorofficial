import React from 'react'
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
          <div>
            <form action="">
              <div className='my-3'>
                <div className='text-textprimary m-1'>gmail</div>
                <input
                className="login-text-area"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              </div>
              <div className='my-3'>
                <div className='text-textprimary m-1'>password</div>
                <input
                className="login-text-area"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              </div>
              <button type="submit" className='submit-button'>Login</button>
            </form>
          </div>
          <div className='my-5 text-center text-textprimary'>
            ALI
          </div>
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