import Link from 'next/link'
import { auth, db } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore'
import Message from '../components/message'

export default function Dashbord() {
    const router = useRouter()

    const [user, loading] = useAuthState(auth)

    const [posts, setPosts] = useState([])

    const getData = async () => {
        if (loading) return;
        if (!user) return router.push('/auth/login');
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }))
        return unsubscribe;
    }

    useEffect(() => {
        getData();
    }, [user, loading])

    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
    }

    return (
        <div className='pt-3'>
            <h1>Your Posts</h1>
            <div>
                {posts.map((post) => {
                    return (
                        <Message key={post.id} {...post} >
                            <div className='flex gap-4 bg-white'>
                                <button
                                    className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm bg-white'
                                    onClick={() => deletePost(post.id)}
                                >
                                    <img src="https://img.icons8.com/3d-fluency/24/000000/trash.png" className='bg-white' />
                                    Delete
                                </button>
                                <Link href={{ pathname: "/post", query: post }}>
                                    <button className='text-teal-600 flex items-center justify-center gap-2 py-2 text-sm bg-white'>
                                        <img src="https://img.icons8.com/3d-fluency/24/000000/edit-chat-history.png" className='bg-white' />
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </Message>
                    );
                })}
            </div>
            <button
                className='font-medium text-white bg-gray-800 px-4 py-2 my-6 hover:bg-gray-600'
                onClick={() => auth.signOut()}
            >
                Sign out
            </button>
        </div>
    );
};
