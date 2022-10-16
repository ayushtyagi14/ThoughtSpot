import { auth, db } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Post() {
    const [user, loading] = useAuthState(auth)

    const router = useRouter()
    const routerData = router.query;

    const [post, setPost] = useState({ description: "" })

    const submitPost = async (e) => {
        e.preventDefault();

        if (!post.description) {
            toast.error('Description Field is Empty 😅', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

            return;
        }

        if (post.description.length > 600) {
            toast.error('Description is too long 🤓', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

            return;
        }

        if (post?.hasOwnProperty("id")) {
            const docRef = doc(db, "posts", post.id);
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            return router.push("/")
        }
        else {
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName
            })
            setPost({ description: "" })
            toast.success("New post has been created 🚀", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            return router.push('/')
        }
    }

    const checkUser = async () => {
        if (loading) return;
        if (!user) router.push('/auth/login');
        if (routerData.id) {
            setPost({ description: routerData.description, id: routerData.id })
        }
    };

    useEffect(() => {
        checkUser();
    }, [user, loading])

    return (
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-lg mx-auto'>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-bold'>
                    {post.hasOwnProperty('id') ? 'Edit your post' : 'Create a new post'}
                </h1>
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'
                        placeholder='What&#39;s on your Mind?'></textarea>
                    <p className={`font-medium text-sm ${post.description.length > 600 ? 'text-red-600' : 'text-cyan-600'}`} > {post.description.length} / 600</p>
                </div>
                <button
                    type="submit"
                    className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'>Submit</button>
            </form>
        </div>
    )
}
