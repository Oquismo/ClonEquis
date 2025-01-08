'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMessageCircle } from '@tabler/icons-react';
import { IconRepeat } from '@tabler/icons-react';
import { IconHeartPlus } from '@tabler/icons-react';
import PostCard from "./post-card";

type User = {
  user_name: string;
  name: string;
  avatar_url: string;
};

type Post = {
  id: string;
  user: User;
  content: string;
};

export function PostList({ posts }: { posts: Post[] }) {
  const [requestMade, setRequestMade] = useState(false);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);

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

  return (
    <>
      {fetchedPosts.map((post) => (
        <PostCard
          key={post.id}
          userName={post.user.user_name}
          userFullName={post.user.name}
          avatar_url={post.user.avatar_url}
          content={post.content}
        />
      ))}
    </>
  );
}