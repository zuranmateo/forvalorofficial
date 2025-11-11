import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/sanity/lib/auth'

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
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
              </Link>

              <form action={async() => {
                "use server"
                await signOut({ redirectTo: "/" });
              }}>
                <button type='submit'>
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
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

