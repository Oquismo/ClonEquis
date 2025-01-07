import React from 'react';
import PostCard from './post-card'; // Asegúrate de que la ruta sea correcta

type Post = {
  id: string;
  content: string;
  user: {
    userName: string;
    userFullName: string;
    avatar_url: string;
  };
  created_at: string;
};

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map(({ id, content, user, created_at }) => {
        const { userName, userFullName, avatar_url: avatarUrl } = user;
        return (
          <PostCard 
            content={content}
            key={id} 
            userName={userName} 
            userFullName={userFullName} 
            avatarUrl={avatarUrl}
            createdAt={created_at} // Pasar la fecha de publicación a PostCard
          />
        );
      })}
    </>
  );
}