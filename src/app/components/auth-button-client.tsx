"use client";

import React, { useEffect, useState } from 'react';
import { type Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { IconBrandGithub } from '@tabler/icons-react';

type Post = {
  id: string;
  title: string;
  // Agrega otros campos según sea necesario
};

function PostList({ posts }: { posts: Post[] }) {
  const [postList, setPostList] = useState<Post[]>(posts);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: Post[] = await response.json();
      setPostList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {postList.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export function AuthButton({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient({});
  const router = useRouter();

  const handleSignIn = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "https://clon-equis.vercel.app/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirecciona al home después de cerrar sesión
  };

  useEffect(() => {
    if (session) {
      router.push('/'); // Asegúrate de que esta ruta sea la correcta para mostrar los posts
    }
  }, [session, router]);

  return (
    <div>
      {session ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={() => handleSignIn('github')}>
          <IconBrandGithub />
          Sign In with GitHub
        </button>
      )}
    </div>
  );
}
