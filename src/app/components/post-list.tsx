'use client'
import PostCard from "./post-card";
import { useState, useEffect } from "react";
import { Post } from './post'


// Define el tipo 'User' si no está definido en otro lugar
type User = {
  user_name: string;
  name: string;
  avatar_url: string;
};

// Define el tipo 'Post' si no está definido en otro lugar
type Post = {
  id: string;
  user: User;
  content: string;
};

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const [requestMade, setRequestMade] = useState(false);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (!requestMade) {
      const fetchPosts = async () => {
        try {
          const response = await fetch("https://clon-equis.vercel.app/api/posts", {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          });
          const data = await response.json();
          setFetchedPosts(data.posts);
          setRequestMade(true); // Marca que la solicitud ya se ha realizado
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchPosts();
    }
  }, [requestMade]);

  const handlePostDelete = (id: string) => {
    setFetchedPosts(fetchedPosts.filter((post) => post.id !== id));
  };

  return (
    <>
      {fetchedPosts.map((post) => (
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