import Link from "next/link"
import Image from "next/image"
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Logo } from '../public/logo.png'

export default function Nav() {
    const [user, loading] = useAuthState(auth)

    return (
        <nav className="flex justify-between items-center px-2 py-10 bg-white">
            <Link href='/'>
                <img src="data:image/png;base64,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" alt="Logo" className="cursor-pointer" width={140} height={140} />
            </Link>
            <ul className="flex items-center gap-10">
                {user ?
                    <div className="flex items-center gap-6 bg-white">
                        <Link href="/post">
                            <button className="font-medium bg-cyan-500 text-white px-3 py-1 rounded text-sm hover:px-3.5 hover:py-1.5 g">
                               New Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <img src={user.photoURL} alt="user-image" className="rounded-full cursor-pointer" width={40} height={40} />
                        </Link>
                    </div> :
                    <div className="bg-white">
                        <Link href='/auth/login'>
                            <a className="py-2 px-4 text-sm bg-cyan-500 text-white ml-8 rounded-lg font-medium">Join Now</a>
                        </Link>
                    </div>
                }
            </ul>
        </nav>
    )
}
