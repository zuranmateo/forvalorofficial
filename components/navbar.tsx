import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'



export default async function Navbar() {
  const session = await auth();
  return (
    <header className="header">
        <nav className='flex justify-between items-center text-xl'>
            <Link href="/" className='flex justify-between'>
                <Image src="/logo-round.png" alt='logo' width={40} height={40} />
                <div className='font-cardinal text-3xl'>
                  FOR VALOR OFFICIAL
                </div>
            </Link>
            <div className="flex items-center gap-5">
          {session && session?.user ?
          (
            <>
              <Link href="/getgame">
                <span className="max-sm:hidden block bg-secondary py-2 px-4 rounded-xl">GET GAME</span>
              </Link>

              <form action={async() => {
                "use server"
                await signOut({ redirectTo: "/" });
              }}>
                <button type='submit'>
                  Logout
                </button>
              </form>
              <Link href={`/user/${session?.user?.id}`} className='flex justify-between items-center'>
                <span>{session?.user?.name}</span>
                <Image src={`${session?.user?.image || session?.user?.imageUrl || "/defaultProfileImg.png"}`  }  alt='profile picture' height={50} width={50} className='rounded-4xl mx-3 h-11 w-11 object-cover' />
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
