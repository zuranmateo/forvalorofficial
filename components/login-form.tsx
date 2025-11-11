'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { signInAction, signInWithGithub } from '@/sanity/lib/actions';
import { redirect } from 'next/navigation';

const initState = {
    status: false,
    errors: []
};

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
    const { data: session, status } = useSession();
    const [state, action] = useActionState(signInAction, initState);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (state.status || status === 'authenticated') {
            router.push('/');
        }
    }, [status, state.status, router]);

  return (
    <>
      {session && session?.user ? (
        redirect("./")
      ):(
        <div>
          <div>
            <form action={action} className="space-y-6">
                        <input type="email" name="email" placeholder="Email" className="w-full p-2 rounded-[30px] border border-gray-300" />
                        <PasswordFields isRegistering={isRegistering} onValidityChange={setIsPasswordValid} />
                        {Boolean(state.errors.length) && (
                            <div className="text-red-500">
                                {state.errors.map((error, i) => (
                                    <ul key={i}>
                                        <li>{error}</li>
                                    </ul>
                                ))}
                            </div>
                        )}
                        <button type="submit" className={`w-full p-2 rounded-[30px] text-white ${!isPasswordValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`} disabled={!isPasswordValid}>
                            {isRegistering ? 'Register' : 'Sign In'}
                        </button>
                    </form>
          </div>
          <div className='my-5 text-center text-textprimary'>
            ALI
          </div>
          <form action={signInWithGithub}>
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
