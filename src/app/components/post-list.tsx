'use client'
import PostCard from "./post-card"
import { useState, useEffect } from "react"

// Define el tipo 'User' si no está definido en otro lugar
type User = {
  user_name: string
  name: string
  avatar_url: string
}

// Define el tipo 'Post' si no está definido en otro lugar
type Post = {
  id: string
  user: User
  content: string
}

export function PostList({ posts }: { posts: Post[] }) {
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setFetchedPosts(data)
    }

    fetchPosts()
  }, []) // Evita re-llamadas

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
  )
}