'use client'
import { useState } from 'react';
import { Post } from './post';

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
                <Post
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    userAvatarUrl={post.user.avatar_url}
                    onDelete={handlePostDelete}
                />
            ))}
        </>
    );
}