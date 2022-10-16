import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react';

export default function login() {
    const [user, loading] = useAuthState(auth)

    const router = useRouter()

    const googleProvider = new GoogleAuthProvider();

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            router.push("/")
        } else {
            console.log("login")
        }
    }, [user])


    return (
        <div className="shadow-2xl lg:mt-16 mt-32 p-10 text-gray-700 rounded-t-none rounded-lg bg-white">
            <h2 className="text-2xl font-medium bg-white">Join Today</h2>
            <div className="py-4 bg-white">
                <h3 className="py-4 bg-white">Sign in with one of the Providers</h3>
                <button onClick={GoogleLogin} className="text-white bg-gray-700 w-full font-medium lg:text-xl rounded-lg flex items-center gap-2 align-middle p-4">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}
