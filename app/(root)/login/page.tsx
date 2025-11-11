import React, { Suspense } from 'react'
import Image from 'next/image';
import LoginForm from '@/components/login-form';


export default function page () {
  return (
    <main className='main'>
        <div className='login-container'>
            <div className='flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36'>
                <div className="w-32 text-white md:w-36">
                    <Image src={"/logo-round.png"} alt='logo' width={60} height={60} />
                </div>
            </div>
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    </main>
  )
}