export default function Message({ children, avatar, username, description }) {
    return (
        <div className="bg-white p-8 border-b-2 shadow-sm rounded-lg my-3">
            <div className="flex items-center gap-2 bg-white">
                <img src={avatar} className="w-10 rounded-full" alt="avatar" />
                <h2 className="bg-white">{username}</h2>
            </div>
            <div className="py-4 bg-white">
                <p className="bg-white">{description}</p>
            </div>
            <div className="bg-white">
                {children}
            </div>
        </div>
    )
}
