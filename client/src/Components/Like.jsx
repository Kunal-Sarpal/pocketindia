import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Like = ({ initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="relative">
            <button
                onClick={handleLike}
                className={`p-2 rounded-full border border-zinc-400 shadow-sm text-zinc-500 hover:bg-red-100 hover:text-red-600 transition-all duration-300 
                ${liked ? "bg-red-100 text-red-600" : "bg-white"}`}
            >
                <FaHeart className={`text-lg transition-transform duration-300 ${liked ? "scale-110" : "scale-100"}`} />
            </button>
            <span className="absolute -top-2 -right-2 text-xs bg-zinc-200 text-zinc-600 px-2 py-1 rounded-full shadow-sm">
                {likes==null ? 0 : likes}
            </span>
        </div>
    );
};

export default Like;
