import React, { useEffect, useState } from 'react';
import PostCard from "./post-card"

// Define el tipo 'post' si no está definido en otro lugar
type User = {
  user_name: string;
  name: string;
  avatar_url: string;
};

type Post = {
  id: string;
  user: User;
  content: string;
  created_at: string; // Añadir el campo de fecha de publicación
};

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://clon-equis.vercel.app/?_rsc=1h9g0", {
      headers: {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2F%22%2C%22refetch%22%5D%7D%5D",
        priority: "u=1, i",
        rsc: "1",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      referrer: "https://clon-equis.vercel.app/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <>
      {posts?.map(post => {
        const {
          id,
          user,
          content,
          created_at, // Obtener la fecha de publicación
        } = post;
        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl,
        } = user;
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