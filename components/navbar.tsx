import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'



export default async function Navbar() {
  const session = await auth();
  return (
    <header className="header">
        <nav className='flex md:flex-row flex-col justify-between items-center text-xl'>
            <Link href="/" className='flex justify-between'>
                <Image src="/logo-round.png" alt='logo' width={40} height={40}/>
                <div className='font-cardinal lg:text-3xl md:text-2xl sm:text-xl'>
                  FOR VALOR OFFICIAL
                </div>
            </Link>
            <div className="flex flex-row items-center gap-3 lg:gap-5">
          {session && session?.user ?
          (
            <>
              <Link href="/getgame">
                <span className="block bg-secondary py-2 px-4 lg:text-xl md:text-sm text-sm rounded-xl">GET GAME</span>
              </Link>

              <Link href="/comments">
                <span className="block bg-secondary py-2 px-4 lg:text-xl md:text-sm text-sm rounded-xl">COMMENTS</span>
              </Link>

              <form action={async() => {
                "use server"
                await signOut({ redirectTo: "/" });
              }}>
                <button type='submit' className='text-base lg:text-xl'>
                  Logout
                </button>
              </form>
              <Link href={`/user/${session?.user?._id}`} className='flex justify-between items-center'>
                <span className='text-base md:text-base lg:text-xl'>{session?.user?.name}</span>
                <Image src={`${session?.user?.image || session?.user?.imageUrl || "/defaultProfileImg.png"}`  }  alt='profile picture' height={50} width={50} className='rounded-full mx-2 lg:mx-3 lg:h-9 lg:w-9 h-7 w-7 object-cover' />
              </Link>
            </>
          ):(
            <button>
                <Link href='/login'>
                    Login
                </Link>
            </button>
          )}
        </div>
        </nav>
    </header>
  );
}
