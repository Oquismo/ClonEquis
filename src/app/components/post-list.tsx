'use client'
import { useState } from 'react';
import PostCard from './post-card';

interface Post {
    id: string;
    content: string;
    user: {
        name: string;
        avatar_url: string;
        user_name: string;
    };
}

interface PostListProps {
    posts: Post[];
}

export function PostList({ posts }: PostListProps) {
    const [fetchedPosts, setFetchedPosts] = useState(posts);

    const handlePostDelete = (id: string) => {
        setFetchedPosts(fetchedPosts.filter(post => post.id !== id));
    };

    return (
        <>
            {fetchedPosts.map(post => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    userName={post.user.user_name}
                    userFullName={post.user.name}
                    avatar_url={post.user.avatar_url}
                    content={post.content}
                    onDelete={handlePostDelete}
                />
            ))}
        </>
    );
}